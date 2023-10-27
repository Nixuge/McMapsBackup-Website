import { Ref, reactive, ref } from "vue";
import { ServerMap } from "@/ts/server/ServerMap";
import { PageManager } from "./PageManager";
import { sanitizeSearch, sanitize } from "@/ts/utils/TextUtils";
import { serverSearcher } from "@/ts/server/CurrentServer";
import { OptionalTag, Tag, TagNode } from "../data/Tag";


export class SearchEngine {
    public static search: string = "";
    private static allServerMaps: ServerMap[] = [];
    public static currentMapsRawArray: ServerMap[] = [];
    public static currentMapsPages: any = reactive({});
    public static currentLastPageIndex: number = 1;
    public static autocompleteOffset = ref(0);
    public static autocompleteValues: Ref<string[] | undefined> = ref(undefined);

    // private static recalculateInsert() {
    //     // recalculate based on what currentMaps holds
    //     for (let i = 0; i < this.currentMapsRawArray.length; i++) {
    //         const map =  this.currentMapsRawArray[i];
    //         if (!(map.mapName.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search))) {
    //             this.currentMapsRawArray.splice(i, 1);
    //         }
    //     }
    // }

    private static dummyElement = document.createElement('span');
    private static calculateAutocompleteOffset() {
        const inputElement = document.getElementById('searchinput') as HTMLInputElement;
        this.dummyElement.textContent = inputElement.value;
        
        document.body.appendChild(SearchEngine.dummyElement);
        const offset = inputElement.offsetLeft + SearchEngine.dummyElement.offsetWidth;
        document.body.removeChild(SearchEngine.dummyElement);
        return offset;
    }
    private static getAutocompleteMatchingValues(tag: Tag) {
        // Assume tag will always be valid (check on top of showTagAutocompletePopup())
        const tagCompletions = serverSearcher?.validTags.get(tag.type) as string[]; 
        let tagValuesMatching = [];

        for (const tagCompletion of tagCompletions) {
            if (sanitize(tagCompletion).includes(tag.value)) // startsWith or includes ?
                tagValuesMatching.push(tagCompletion);
        }
        return tagValuesMatching;
    }

    private static showTagAutocompletePopup(tag: OptionalTag) {
        if (tag === undefined || tag.type === "invalid") {
            this.autocompleteValues.value = undefined;
            return;
        }

        this.autocompleteOffset.value = this.calculateAutocompleteOffset();
        this.autocompleteValues.value = this.getAutocompleteMatchingValues(tag);
      }

    private static recalculateWhole() {
        // prolly not efficient but oh well

        this.currentMapsRawArray.length = 0;

        const tagNode = TagNode.newFromSearch(this.search);

        this.showTagAutocompletePopup(tagNode.getLastTag());
        
        // Need the ":"s and " "s for the getNewTags parser, so re sanitizing fully 
        // after the sanitizeSearch
        this.search = sanitize(this.search);
        
        // Note: wanted to do smth better with a dict w a function
        // but since everything is just a tiny bit different I can't
        serverSearcher?.grabTags(tagNode);


        for (const map of this.allServerMaps) {
            if (serverSearcher?.isMapGood(map))
                this.currentMapsRawArray.push(map);
        }
    }

    private static generateCurrentMapsPages() {
        // Didn't bother with optimization on this one tbh, always clearing & redoing

        // Clear the old pages
        for (let i = 0; i < this.currentLastPageIndex; i++) {
            delete this.currentMapsPages[i];
        }
        this.currentLastPageIndex = 1;

        // Set the initial page to both the dict & the list
        let _page = 1;

        this.currentMapsPages[_page] = [];

        // Split every 9 items
        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map = this.currentMapsRawArray[i];
            if (this.currentLastPageIndex != _page) {
                this.currentLastPageIndex = _page;
                this.currentMapsPages[_page] = [];
            }
            this.currentMapsPages[_page].push(map);
            if ((i + 1) % 9 == 0) {
                _page += 1;
            }
        }

        // If last page higher than current page, reduce current page to higher page
        if (PageManager.getPage() > _page) {
            PageManager.setPage(_page);
        }
    }

    public static init(allServerMaps: ServerMap[]) {
        this.allServerMaps = allServerMaps;

        this.dummyElement.style.fontSize = "20px";
        this.dummyElement.style.whiteSpace = "pre"; // needed to handle spaces in spans
        this.dummyElement.style.visibility = 'hidden';
        
        this.recalculateWhole();
        this.update();
    }

    private static update() {
        this.generateCurrentMapsPages();
        PageManager.genPageListSelect();
        if (PageManager.getPage() > this.currentLastPageIndex) {
            PageManager.setPage(this.currentLastPageIndex)
        }
    }

    //TODO: handle "select" change
    public static handleInputChange(event: any) {
        this.search = sanitizeSearch(event.target.value);

        // insertText -> causes issues when ctrl+a ing & replacing :/, will maybe have to recalculate everything anyways
        // deleteContentBackward, insertFromPaste, historyUndo -> tested ones, need recalculateWhole
        // 
        // TODO?:  have recalculateWhole do it based on last input, & check from that
        //
        // ========== Edit (for now) ==========
        // Due to numerous issues, and since CPUs are powerful enough nowadays, 
        // recalculateWhole() is used everytime, even when just adding text.
        // (note: even when spamming, this uses like 2% 
        // of what the animated gradient background uses)

        // if (event.inputType == "insertText")
            // this.recalculateInsert()
        // else
            // this.recalculateWhole();       
        
        this.recalculateWhole();
        this.update();
    }
}