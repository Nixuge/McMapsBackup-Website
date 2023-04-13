import { PageManager } from "../manager/PageManager";

// export enum TYPES {
//     NORMAL = undefined,
//     NEXT = PageManager.nextPage,
//     PREVIOUS = PageManager.previousPage
// }

// remade enum bc TS enums have too much limitations (number based)
export class TYPE {
    public static Normal = new TYPE("", this.toString)
    public static Next = new TYPE(">", this.toString)
    public static Previous = new TYPE("<", this.toString)
    //TODO: add "first" & "last"

    constructor(public text: string, public func: Function) {
        this.text = text;
        this.func = func;
    }

    toString() {
        return this.func;
    }
}


export class PageButtonData {
    public type: TYPE;
    public page?: number;
    public text: string;

    constructor(type: TYPE, page: number | undefined = undefined) {
        this.type = type;
        this.page = page;
        this.text = (page == undefined) ? type.text : page.toString();
    }

    public call() {
        // can't use this.type.func() directly,
        // need to use apply(PageManager) to run it on the static instance
        if (this.page != undefined) {
            this.type.func.apply(PageManager, [this.page])
        } else {
            this.type.func.apply(PageManager)
        }
    }
}