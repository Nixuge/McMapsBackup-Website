import { Ref, nextTick, reactive, ref } from "vue";
import { ServerMap } from "@/ts/server/ServerMap";
import { PageManager } from "./PageManager";
import { sanitizeSearch, sanitize } from "@/ts/utils/TextUtils";
import { serverSearcher } from "@/ts/server/CurrentServer";
import { OptionalTag, Tag, TagNode } from "../data/Tag";

export enum CompletionType {
    NONE,
    TAGVALUE,
    TAGNAME
}

let registeredInputElement: HTMLInputElement | null = null;
export function registerSearchInput(el: HTMLInputElement | null) {
    registeredInputElement = el;
}

function getInputElement(): HTMLInputElement | null {
    if (registeredInputElement) return registeredInputElement;
    if (typeof document !== "undefined") {
        return document.getElementById("searchinput") as HTMLInputElement | null;
    }
    return null;
}

export class AutoCompleter {
    public static xOffset = ref(0);
    public static completionValues: Ref<string[] | undefined> = ref(undefined);
    public static completionTaglist: CompletionType = CompletionType.NONE;

    public static currentlySelectedTag: Ref<number> = ref(-1);
    public static currentlySelectedTagText: string = "";

    private static dummyElement: HTMLSpanElement | null = null;

    public static init() {
        if (typeof document !== "undefined" && !this.dummyElement) {
            this.dummyElement = document.createElement("span");
            this.dummyElement.style.fontSize = "20px";
            this.dummyElement.style.whiteSpace = "pre"; // needed to handle spaces in spans
            this.dummyElement.style.visibility = "hidden";
        }
    }

    private static calculateAutocompleteOffset() {
        const inputElement = getInputElement();
        if (!inputElement || typeof document === "undefined")
            return 0;

        if (!this.dummyElement) {
            this.init();
        }
        if (!this.dummyElement) return inputElement.offsetLeft;

        this.dummyElement.textContent = inputElement.value;
        document.body.appendChild(this.dummyElement);
        const offset = inputElement.offsetLeft + this.dummyElement.offsetWidth;
        document.body.removeChild(this.dummyElement);
        return offset;
    }

    private static getAutocompleteMatchingValues(tag: Tag) {
        const searcher = serverSearcher.value;
        const tagCompletions = searcher?.validTags.get(tag.type) as string[] | undefined;
        if (!tagCompletions)
            return [];

        const tagValuesMatching: string[] = [];
        for (const tagCompletion of tagCompletions) {
            if (sanitize(tagCompletion).includes(tag.value)) {
                tagValuesMatching.push(tagCompletion);
            }
        }
        return tagValuesMatching;
    }

    public static showTagvalueAutocompletePopup(tag: OptionalTag) {
        if (tag === undefined || tag.type === "invalid") {
            this.completionValues.value = undefined;
            this.currentlySelectedTag.value = -1;
            this.currentlySelectedTagText = "";
            return;
        }
        this.completionTaglist = CompletionType.TAGVALUE;
        this.xOffset.value = this.calculateAutocompleteOffset();
        this.completionValues.value = this.getAutocompleteMatchingValues(tag);
    }

    public static showTaglistAutocompletePopup() {
        this.completionTaglist = CompletionType.TAGNAME;
        this.xOffset.value = this.calculateAutocompleteOffset();

        const values = serverSearcher.value?.validTags.keys() as IterableIterator<string> | undefined;
        this.completionValues.value = values ? Array.from(values) : [];
    }

    public static onAutocompletePress(completion: string) {
        if (this.completionTaglist === CompletionType.TAGNAME) {
            SearchEngine.addTagName(completion);
        } else {
            SearchEngine.setLastTag(completion);
        }
    }

    public static handleAutocompleteKeyboardPresses(e: KeyboardEvent) {
        const completions = this.completionValues.value;
        if (!completions || completions.length === 0)
            return;

        const currentlySelected = this.currentlySelectedTag.value;

        switch (e.key) {
            case "Enter":
                if (currentlySelected === -1)
                    return;
                this.onAutocompletePress(completions[currentlySelected]);
                break;

            case "ArrowDown":
                e.preventDefault();
                if (currentlySelected < completions.length - 1) {
                    this.currentlySelectedTag.value += 1;
                }
                break;

            case "ArrowUp":
                e.preventDefault();
                if (currentlySelected > 0) {
                    this.currentlySelectedTag.value -= 1;
                }
                break;

            default:
                break;
        }
    }
}

export class SearchEngine {
    public static search: string = "";
    private static allServerMaps: ServerMap[] = [];
    public static currentMapsRawArray: ServerMap[] = [];
    public static currentMapsPages: Record<number, ServerMap[]> = reactive({});
    public static currentLastPageIndex: number = 1;

    private static recalculateWhole() {
        this.currentMapsRawArray.length = 0;

        const tagNode = TagNode.newFromSearch(this.search);

        AutoCompleter.showTagvalueAutocompletePopup(tagNode.getLastTag());

        this.search = sanitize(this.search);

        const searcher = serverSearcher.value;
        searcher?.grabTags(tagNode);

        for (const map of this.allServerMaps) {
            if (searcher?.isMapGood(map)) {
                this.currentMapsRawArray.push(map);
            }
        }
    }

    private static generateCurrentMapsPages() {
        for (let i = 0; i <= this.currentLastPageIndex; i++) {
            delete this.currentMapsPages[i];
        }
        this.currentLastPageIndex = 1;

        let _page = 1;
        this.currentMapsPages[_page] = [];

        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map = this.currentMapsRawArray[i];
            if (this.currentLastPageIndex !== _page) {
                this.currentLastPageIndex = _page;
                this.currentMapsPages[_page] = [];
            }
            this.currentMapsPages[_page].push(map);
            if ((i + 1) % 9 === 0) {
                _page += 1;
            }
        }

        if (PageManager.getPage() > _page) {
            PageManager.setPage(_page);
        }
    }

    public static init(allServerMaps: ServerMap[]) {
        this.allServerMaps = allServerMaps;
        this.search = "";
        AutoCompleter.init();

        this.recalculateWhole();
        this.update();
    }

    private static update() {
        this.generateCurrentMapsPages();
        PageManager.genPageListSelect();
        if (PageManager.getPage() > this.currentLastPageIndex) {
            PageManager.setPage(this.currentLastPageIndex);
        }
        nextTick(() => {
            PageManager.updateOffsets();
        });
    }

    public static addTagName(tag: string) {
        const inputElement = getInputElement();
        if (!inputElement) return;

        let text = inputElement.value;
        if (text.length > 0 && text[text.length - 1] !== " ") {
            text += " ";
        }
        text += tag + ":";
        inputElement.value = text;
        this.search = sanitizeSearch(text);

        this.recalculateWhole();
        this.update();

        inputElement.focus();
    }

    public static setLastTag(lastTagStr: string) {
        const inputElement = getInputElement();
        if (!inputElement)
            return;

        const firstPart = inputElement.value.split(":").slice(0, -1).join(":"); // Get all parts except the last one
        const newStr = `${firstPart}:${lastTagStr.replaceAll(" ", "")} `;
        inputElement.value = newStr;
        this.search = sanitizeSearch(newStr);

        this.recalculateWhole();
        this.update();

        inputElement.focus();
    }

    public static handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.search = sanitizeSearch(target.value);

        this.recalculateWhole();
        this.update();
    }
}
