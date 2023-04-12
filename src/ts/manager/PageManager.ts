import { ref } from "vue";
import { updateUrl } from "./UrlManager";

// Java flashbacks
export class PageManager {
    public static page = ref(1);

    public static setPage(page: number) {
        this.page.value = page;
        updateUrl();
    }

    public static getPage() {
        return this.page.value;
    }
}