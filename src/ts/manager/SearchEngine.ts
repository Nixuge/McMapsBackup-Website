import { reactive } from "vue";
import { MAPS } from "../data/BaseData"
import { McMap } from "../data/McMap";
import { PageManager } from "./PageManager";
import { textToBool, sanitizeSearch, sanitize } from "../TextUtils";
import { TagsManager } from "./TagsManager";

export class SearchEngine {
    private static search: string = "";
    public static currentMapsRawArray: Array<McMap> = MAPS.slice(0);
    public static currentMapsPages: any = reactive({});
    public static currentPageLastIndex: number = 1;

    private static recalculateInsert() {
        // recalculate based on what currentMaps holds
        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map =  this.currentMapsRawArray[i];
            if (!(map.mapName.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search))) {
                this.currentMapsRawArray.splice(i, 1);
            }
        }
    }

    private static recalculateWhole() {
        // prolly not efficient but oh well

        this.currentMapsRawArray.length = 0;

        const tagNode = TagsManager.getNewTags(this.search);

        // Need the ":"s and " "s for the getNewTags parser, so re sanitizing fully 
        // after the sanitizeSearch
        this.search = sanitize(this.search);
        
        // Note: wanted to do smth better with a dict w a function
        // but since everything is just a tiny bit different I can't
        const nanoTag = tagNode.getTag("nano");
        const wantsNano = (nanoTag == undefined) ? undefined : textToBool(nanoTag.value);
        
        const gameTag = tagNode.getTag("game");
        const builderTag = tagNode.getTag("builder");
        const remaining = tagNode.getRemaining();

        for (const map of MAPS) {
            if (nanoTag != undefined) {
                // Skip only if both tags aren't the same
                if (!((map.nano && wantsNano) || (!map.nano && !wantsNano))) {
                    continue;
                }
            }

            if ((gameTag != undefined && !map.sanitizedMinigame.includes(gameTag.value)) ||
                (builderTag != undefined && !map.sanitizedBuilders.includes(builderTag.value)) ||
                (remaining != "" && !map.sanitizedMapName.includes(remaining))) {
                continue;
            }

            this.currentMapsRawArray.push(map);
        }
        
    }

    private static generateCurrentMapsPages() {
        // Didn't bother with optimization on this one tbh, always clearing & redoing

        // Clear the old pages
        for (let i = 0; i < this.currentPageLastIndex; i++) {
            delete this.currentMapsPages[i];
        }
        this.currentPageLastIndex = 1;

        // Set the initial page to both the dict & the list
        let _page = 1;

        this.currentMapsPages[_page] = [];

        // Split every 9 items
        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map = this.currentMapsRawArray[i];
            if (this.currentPageLastIndex != _page) {
                this.currentPageLastIndex = _page;
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

    public static init() {
        this.recalculateWhole();
        this.update();
    }

    private static update() {
        this.generateCurrentMapsPages();
        PageManager.genPageListSelect();
        if (PageManager.getPage() > this.currentPageLastIndex) {
            PageManager.setPage(this.currentPageLastIndex)
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