export enum ButtonType {
    NORMAL = "",
    NEXT = ">",
    PREVIOUS = "<"
}

export enum ButtonEffect {
    DISABLED,
    CURRENT
}

export class PageButtonData {
    public text: string;
    public effect?: ButtonEffect;
    public type: ButtonType;
    public page?: number;
    private action?: () => void;

    constructor(type: ButtonType, page?: number, effect?: ButtonEffect, action?: () => void) {
        this.type = type;
        this.page = page;
        this.effect = effect;
        this.text = page !== undefined ? page.toString() : type;
        this.action = action;
    }

    public call() {
        if (this.effect === ButtonEffect.DISABLED) {
            return;
        }
        this.action?.();
    }
}
