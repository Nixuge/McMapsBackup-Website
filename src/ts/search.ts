import { reactive, ref } from "vue";
import { MAPS } from "./base_data"
import { McMap } from "./mcmap";

export class SearchEngine {
    private static search: string = ""
    private static currentMaps: Array<McMap> = MAPS.slice(0);
    public static currentMapsPages: any = ref({});
    public static currentPageIndexes: Array<number> = reactive([]);

    private static recalculateInsert() {
        // recalculate based on what currentMaps holds
        for (let i = 0; i < this.currentMaps.length; i++) {
            const map =  this.currentMaps[i];
            if (!(map.map_name.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search))) {
                this.currentMaps.splice(i, 1)
            }
        }
    }
    private static recalculateWhole() {
        // prolly not efficient but oh well
        this.currentMaps.length = 0;
        MAPS.forEach(map => {
            if (map.map_name.includes(this.search) || map.builders.includes(this.search) || map.minigame.includes(this.search)) {
                this.currentMaps.push(map)
            }
        });
    }

    private static generateCurrentMapsPages() {
        // Didn't bother with optimization on this one tbh, always clearing & redoing
        //TODO: handle clearing pages

        // clear the old pages
        this.currentPageIndexes.forEach(index => {
            delete this.currentMapsPages[index];
        });
        this.currentPageIndexes.length = 0

        // set the initial page to both the dict & the list
        let _page = 1;

        this.currentPageIndexes.push(_page);
        this.currentMapsPages[_page] = []

        // split every 9 items
        for (let i = 0; i < this.currentMaps.length; i++) {
            const map = this.currentMaps[i];
            this.currentMapsPages[_page].push(map)
            if ((i + 1) % 9 == 0) {
                _page += 1
                this.currentMapsPages[_page] = []
                this.currentPageIndexes.push(_page)
            }
        }
    }

    public static init() {
        this.recalculateWhole();
        this.generateCurrentMapsPages();
    }

    //TODO: handle "select" change
    public static handleInputChange(event: any) {
        this.search = event.target.value;

        switch (event.inputType) {
            case "insertText": // causes issues when ctrl+a ing & replacing :/
                this.recalculateInsert(); // will maybe have to recalculate the whole thing anyways every time
                break;
            
            case "deleteContentBackward": // may delete one or more chars
            case "insertFromPaste": // may insert multiple chars/replace existing chars
            case "historyUndo":
                this.recalculateWhole();
                break;
            
            default:
                this.recalculateWhole();
                break;
        }

        this.generateCurrentMapsPages();
        // console.log(this.currentMapsPages);
    }
}