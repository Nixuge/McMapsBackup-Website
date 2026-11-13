import { reactive, ref, watch } from "vue";
import { updateUrl } from "./UrlManager";
import { SearchEngine } from "./SearchEngine";
import { PageButtonData, ButtonType, ButtonEffect } from "@/ts/data/PageButtonType";

export const page = ref(1);
export const pageSelector = reactive<PageButtonData[]>([
    new PageButtonData(ButtonType.NORMAL, 1, undefined, () => PageManager.setPage(1))
]);
export const finalPos = ref(0);
export const maxWidth = ref("95vw");
export const isHovering = ref(false);

export class PageManager {
    public static page = page;
    public static pageSelector = pageSelector;
    public static finalPos = finalPos;
    public static maxWidth = maxWidth;

    public static setPage(_page: number) {
        if (_page > SearchEngine.currentLastPageIndex || _page < 1)
            return;
        page.value = _page;
        updateUrl();
    }

    public static nextPage() {
        page.value += 1;
        updateUrl();
    }

    public static previousPage() {
        if (page.value > 1) {
            page.value -= 1;
            updateUrl();
        }
    }

    public static getPage() {
        return page.value;
    }

    private static genPageListSimpleRange(lastIndex: number) {
        // Used if 10 or less pages shown
        for (let i = 1; i <= lastIndex; i++) {
            const effect = i === this.getPage() ? ButtonEffect.CURRENT : undefined;
            pageSelector.push(new PageButtonData(ButtonType.NORMAL, i, effect, () => PageManager.setPage(i)));
        }
    }

    private static genPageListComplicated(lastIndex: number) {
        // Used if 11 or more pages shown
        const currentPage = this.getPage();
        let totalToDoAfter = 5;

        // before current page
        for (let i = currentPage - 4; i < currentPage; i++) {
            if (i < 1) {
                totalToDoAfter++;
                continue;
            }
            pageSelector.push(new PageButtonData(ButtonType.NORMAL, i, undefined, () => PageManager.setPage(i)));
        }

        // current page
        pageSelector.push(new PageButtonData(ButtonType.NORMAL, currentPage, ButtonEffect.CURRENT, () => PageManager.setPage(currentPage)));

        // after current page
        const maxLoopIndex = currentPage + totalToDoAfter;
        let overflow = 0;
        for (let i = currentPage + 1; i < maxLoopIndex; i++) {
            if (i > lastIndex) {
                overflow = maxLoopIndex - i;
                break;
            }
            pageSelector.push(new PageButtonData(ButtonType.NORMAL, i, undefined, () => PageManager.setPage(i)));
        }

        // balance out overflow by adding before
        if (overflow > 0) {
            for (let i = currentPage - 5; i > currentPage - 5 - overflow; i--) {
                if (i < 1)
                    break;
                pageSelector.unshift(new PageButtonData(ButtonType.NORMAL, i, undefined, () => PageManager.setPage(i)));
            }
        }
    }

    public static genPageListSelect() {
        pageSelector.length = 0;

        const lastIndex = SearchEngine.currentLastPageIndex;
        const currentPage = this.getPage();

        if (lastIndex < 11)
            this.genPageListSimpleRange(lastIndex);
        else
            this.genPageListComplicated(lastIndex);

        pageSelector.unshift(new PageButtonData(
            ButtonType.PREVIOUS,
            undefined,
            currentPage <= 1 ? ButtonEffect.DISABLED : undefined,
            () => PageManager.previousPage()
        ));

        pageSelector.push(new PageButtonData(
            ButtonType.NEXT,
            undefined,
            currentPage >= lastIndex ? ButtonEffect.DISABLED : undefined,
            () => PageManager.nextPage()
        ));
    }

    public static onScroll(event: WheelEvent) {
        if (!isHovering.value)
            return;

        event.preventDefault();
        if (event.deltaY < 0)
            this.setPage(this.getPage() + 1);
        else
            this.setPage(this.getPage() - 1);
    }

    private static grid?: HTMLElement;
    private static pageSelect?: HTMLElement;

    public static setElementsForOffset(grid: HTMLElement, pageSelect: HTMLElement) {
        this.grid = grid;
        this.pageSelect = pageSelect;
    }

    public static updateOffsets() {
        const grid = this.grid;
        const pageSelect = this.pageSelect;
        if (!grid || !pageSelect)
            return;

        const gridMid = grid.clientWidth / 2;
        const posLeft = gridMid - (pageSelect.clientWidth / 2);
        this.finalPos.value = grid.offsetLeft + posLeft;

        const posDiff = (pageSelect.clientLeft + pageSelect.clientWidth) - (grid.clientLeft + grid.clientWidth);
        // If goes to the right too much when centered
        if (posDiff > 0) {
            this.finalPos.value = grid.offsetLeft;
        }
        // If is goes to the right too much when centered AND is wider
        if (pageSelect.clientWidth > grid.clientWidth) {
            this.maxWidth.value = grid.clientWidth + "px";
        } else {
            this.maxWidth.value = "95vw";
        }
    }
}

if (typeof window !== "undefined") {
    // {passive: false} Needed to preventDefault()
    window.addEventListener("wheel", (event: WheelEvent) => { PageManager.onScroll(event); }, { passive: false });
}

watch(page, () => {
    PageManager.genPageListSelect();
});
