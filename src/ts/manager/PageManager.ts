import { reactive, ref } from "vue";
import { updateUrl } from "./UrlManager";
import { SearchEngine } from "./SearchEngine";
import { PageButtonData, TYPE } from "../data/PageButtonType";

// Java OOP flashbacks
export class PageManager {
    public static page = ref(1);
    public static pageSelector: Array<PageButtonData> = reactive([new PageButtonData(TYPE.Normal, 1)])

    public static setPage(_page: number) {
        this.page.value = _page;
        updateUrl();
    }

    public static nextPage() {
        this.page.value += 1;
        updateUrl();
    }

    public static previousPage() {
        if (this.page.value > 1) {
            this.page.value -= 1;
            updateUrl();
        }
    }

    public static getPage() {
        return this.page.value;
    }

    public static genPageListSelect() {
        //TODO: actually generate "next", "previous", "last", "first" buttons here
        // Will do once i've added more maps to the library
        this.pageSelector.length = 0;
        SearchEngine.currentPageIndexes.forEach(index => {
            this.pageSelector.push(new PageButtonData(TYPE.Normal, index));
        });
    }
}

// Basically did a loop import between PageButtonType & PageManager
// & I couldn't set those functions by default so just replacing them
// after PageManager is initialized lmao
function dirtyTypeEnumFix() {
    TYPE.Normal.func = PageManager.setPage;
    TYPE.Next.func = PageManager.nextPage;
    TYPE.Previous.func = PageManager.previousPage;
}
dirtyTypeEnumFix()