import { PageManager } from "../manager/PageManager";

// export enum TYPES {
//     NORMAL = undefined,
//     NEXT = PageManager.nextPage,
//     PREVIOUS = PageManager.previousPage
// }

function placeholder() {}

// remade enum bc TS enums have too much limitations (number based)
export class ButtonType {
    public static NORMAL = new ButtonType("", placeholder); // See ../manager/PageManager.ts#42
    public static NEXT = new ButtonType(">", placeholder); // (dirtyTypeEnumFix())
    public static PREVIOUS = new ButtonType("<", placeholder);
    //Todo: maybe add first & last? but they don't seem to be needed

    constructor(public text: string, public func: Function) {
        this.text = text;
        this.func = func;
    }
}

export enum ButtonEffect {
    DISABLED,
    CURRENT
}

export class PageButtonData {
    public text: string;
    public effect?: ButtonEffect;

    constructor(public type: ButtonType, public page?: number, effect?: ButtonEffect) {
        this.type = type;
        this.page = page;

        this.text = (page == undefined) ? type.text : page.toString();
        
        this.effect = effect;        
    }

    public call() {
        if (this.effect == ButtonEffect.DISABLED) {
            return;
        }
        // can't use func() directly,
        // need to use func.apply(PageManager) to run it on the static instance
        if (this.page != undefined) {
            this.type.func.apply(PageManager, [this.page]);
        } else {
            this.type.func.apply(PageManager);
        }
    }
}