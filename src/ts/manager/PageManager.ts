import { reactive, ref, watch, watchEffect } from "vue";
import { updateUrl } from "./UrlManager";
import { SearchEngine } from "./SearchEngine";
import { PageButtonData, ButtonType, ButtonEffect } from "../data/PageButtonType";

// Java OOP flashbacks
export class PageManager {
    public static page = ref(1);
    public static pageSelector: Array<PageButtonData> = reactive([new PageButtonData(ButtonType.NORMAL, 1)])

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

    private static genPageListSimpleRange(lastIndex: number) {
        for (let i = 1; i <= lastIndex; i++) {
            if (i == this.getPage()) {
                this.pageSelector.push(new PageButtonData(ButtonType.NORMAL, i, ButtonEffect.CURRENT));
            } else {
                this.pageSelector.push(new PageButtonData(ButtonType.NORMAL, i));
            }

        }
    }

    private static genPageListComplicated(lastIndex: number) {
        const currentPage = this.getPage();
        let totalToDoAfter = 5;

        // before current page
        for (let i = currentPage - 5; i < currentPage; i++) {
            if (i < 1) {
                totalToDoAfter++;
                continue;
            }
            this.pageSelector.push(new PageButtonData(ButtonType.NORMAL, i));
        }

        // current page
        this.pageSelector.push(new PageButtonData(ButtonType.NORMAL, currentPage, ButtonEffect.CURRENT));

        // after current page
        const maxLoopIndex = currentPage + totalToDoAfter;
        let overflow = 0
        for (let i = currentPage + 1; i < maxLoopIndex; i++) {
            if (i > lastIndex) {
                overflow = maxLoopIndex - i
                break;
            }
            this.pageSelector.push(new PageButtonData(ButtonType.NORMAL, i));
        }

        // balance out overflow
        if (overflow > 0) {
            for (let i = currentPage - 5; i > currentPage - 5 - overflow; i--) {
                if (i < 1) 
                    break;
                this.pageSelector.unshift(new PageButtonData(ButtonType.NORMAL, i));
            }
        }

    }

    public static genPageListSelect() {
        //TODO: actually generate "next", "previous", "last", "first" buttons here
        // Will do once i've added more maps to the library
        this.pageSelector.length = 0;
        const indexes = SearchEngine.currentPageIndexes;

        const lastIndex = indexes[indexes.length - 1];
        const currentPage = this.getPage();

        if (lastIndex < 11)
            this.genPageListSimpleRange(lastIndex)
        else
            this.genPageListComplicated(lastIndex)
        

        if (currentPage == 1)
            this.pageSelector.unshift(new PageButtonData(ButtonType.PREVIOUS, undefined, ButtonEffect.DISABLED));
        else
            this.pageSelector.unshift(new PageButtonData(ButtonType.PREVIOUS));
        

        if (currentPage >= lastIndex)
            this.pageSelector.push(new PageButtonData(ButtonType.NEXT, undefined, ButtonEffect.DISABLED));
        else
            this.pageSelector.push(new PageButtonData(ButtonType.NEXT));
        

    }
}

watch(PageManager.page, () => {
    // works for reactivity tracking
    PageManager.genPageListSelect()
})

// Basically did a loop import between PageButtonType & PageManager
// & I couldn't set those functions by default so just replacing them
// after PageManager is initialized lmao
function dirtyTypeEnumFix() {
    ButtonType.NORMAL.func = PageManager.setPage;
    ButtonType.NEXT.func = PageManager.nextPage;
    ButtonType.PREVIOUS.func = PageManager.previousPage;
}
dirtyTypeEnumFix()