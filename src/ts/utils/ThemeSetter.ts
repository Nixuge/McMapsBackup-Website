import { computed, ref } from "vue";


const cookieTheme = localStorage.getItem("theme");

export let darkTheme = ref(cookieTheme == undefined || cookieTheme == "dark");

export let themeIconClass = computed(() => ({
    "gg-moon": darkTheme.value,
    "gg-sun": !darkTheme.value
}));


const classList = document.documentElement.classList
export function switchTheme() {
    darkTheme.value = !darkTheme.value;
    updateTheme();
};

function updateTheme() {
    if (darkTheme.value) {
        classList.remove("light");
        localStorage.setItem("theme", "dark");
    } else {
        classList.add("light");
        localStorage.setItem("theme", "light");
    }
}


updateTheme()