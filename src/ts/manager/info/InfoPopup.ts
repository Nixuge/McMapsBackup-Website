import { AsyncComponentLoader, defineAsyncComponent, shallowRef } from "vue";

export let currentlyLoadedInfoComponent: any = shallowRef(undefined);

export function loadInfoComponent(component: AsyncComponentLoader) {
    currentlyLoadedInfoComponent.value = defineAsyncComponent(component);
}
export function removeInfoComponent() {
    currentlyLoadedInfoComponent.value = undefined;
}