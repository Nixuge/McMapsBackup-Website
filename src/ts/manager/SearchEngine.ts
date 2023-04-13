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
            if (!(map.map_name.includes(this.search.toLowerCase().replace(" ", "")) || map.builders.includes(this.search.toLowerCase().replace(" ", "")) || map.minigame.includes(this.search.toLowerCase().replace(" ", "")))) {
                this.currentMapsRawArray.splice(i, 1)
            }
        }
    }
    private static recalculateWhole() {
        // prolly not efficient but oh well
        this.currentMapsRawArray.length = 0;
        MAPS.forEach(map => {
            if (map.map_name.includes(this.search.toLowerCase().replace(" ", "")) || map.builders.includes(this.search.toLowerCase().replace(" ", "")) || map.minigame.includes(this.search.toLowerCase().replace(" ", ""))) {
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
            if (!this.currentPageIndexes.includes(_page)) {
                this.currentMapsPages[_page] = []
                this.currentPageIndexes.push(_page)
            }
            this.currentMapsPages[_page].push(map)
            if ((i + 1) % 9 == 0) {
                _page += 1
            }
        }

        // If last page higher than current page, reduce current page to higher page
        if (PageManager.getPage() > _page) {
            PageManager.setPage(_page);
        }
    }

    public static init() {
        this.recalculateWhole();
        this.update()
    }

    private static update() {
        this.generateCurrentMapsPages();
        PageManager.genPageListSelect();
    }

    //TODO: handle "select" change
    public static handleInputChange(event: any) {
        this.search = event.target.value.toLowerCase().replace(" ", "");

        // insertText -> causes issues when ctrl+a ing & replacing :/, will maybe have to recalculate everything anyways
        // deleteContentBackward, insertFromPaste, historyUndo -> tested ones, need recalculateWhole
        // 
        // TODO?:  have recalculateWhole do it based on last input, & check from that

        // if (event.inputType == "insertText") {
            // this.recalculateInsert()
        // } else {
            this.recalculateWhole();
        // }

        this.update()
    }
}