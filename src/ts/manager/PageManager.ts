import { ref } from "vue";
import { updateUrl } from "./UrlManager";

export class PageManager {
    public static page = ref(1);

    public static setPage(page: number) {
        this.page.value = page;
        updateUrl();
    }
}