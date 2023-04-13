import { reactive } from "vue";
import { MAPS } from "../data/BaseData"
import { McMap } from "../data/McMap";
import { PageManager } from "./PageManager";

export class SearchEngine {
    private static search: string = ""
    public static currentMapsRawArray: Array<McMap> = MAPS.slice(0);
    public static currentMapsPages: any = reactive({});
    public static currentPageIndexes: Array<number> = reactive([]);

    private static recalculateInsert() {
        // recalculate based on what currentMaps holds
        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map =  this.currentMapsRawArray[i];
            if (!(map.map_name.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search))) {
                this.currentMapsRawArray.splice(i, 1)
            }
        }
    }
    private static recalculateWhole() {
        // prolly not efficient but oh well
        this.currentMapsRawArray.length = 0;
        MAPS.forEach(map => {
            if (map.map_name.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search)) {
                this.currentMapsRawArray.push(map)
            }
        });
    }

    private static generateCurrentMapsPages() {
        // Didn't bother with optimization on this one tbh, always clearing & redoing

        // Clear the old pages
        this.currentPageIndexes.forEach(index => {
            delete this.currentMapsPages[index];
        });
        this.currentPageIndexes.length = 0

        // Set the initial page to both the dict & the list
        let _page = 1;

        this.currentPageIndexes.push(_page);
        this.currentMapsPages[_page] = []

        // Split every 9 items
        for (let i = 0; i < this.currentMapsRawArray.length; i++) {
            const map = this.currentMapsRawArray[i];
            this.currentMapsPages[_page].push(map)
            if ((i + 1) % 9 == 0) {
                _page += 1
                this.currentMapsPages[_page] = []
                this.currentPageIndexes.push(_page)
            }
        }

        // If last page higher than current page, reduce current page to higher page
        if (PageManager.getPage() > _page) {
            PageManager.setPage(_page);
        }
    }

    private static update() {
        this.generateCurrentMapsPages();
        PageManager.genPageListSelect();
    }

    public static init() {
        this.recalculateWhole();
        this.update()
    }

    //TODO: handle "select" change
    public static handleInputChange(event: any) {
        this.search = event.target.value;

        // insertText -> causes issues when ctrl+a ing & replacing :/, will maybe have to recalculate everything anyways
        // deleteContentBackward, insertFromPaste, historyUndo -> tested ones, need recalculateWhole
        // 
        // TODO?:  have recalculateWhole do it based on last input, & check from that

        if (event.inputType == "insertText") {
            this.recalculateInsert()
        } else {
            this.recalculateWhole();
        }

        this.update()
    }
}