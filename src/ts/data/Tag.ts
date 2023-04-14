export class Tag {
    public type: string;
    constructor(name: string, public value: string) {
        this.type = Tag.tagFromString(name);
    }

    public static tagFromString(name: string) {
        if (validTags.includes(name)) 
            return name;
        return "invalid";
    }
}

// Fuck TS enums
const validTags = [
    "invalid",
    "game",
    "builder",
    "nano"
]
// export enum TagType {
//     INVALID = "invalid",
//     MINIGAME = "minigame",
//     BUILDER = "builder",
//     NANO = "nano"
// }

export class TagNode {
    private tagList: Array<Tag>;
    private remaining: string;
    constructor() {
        this.tagList = [];
        this.remaining = "";
    }

    public addTag(tag: Tag) {
        this.tagList.push(tag);
    }
    public addRemaining(remaining: string) {
        this.remaining += remaining;
    }

    public getTags() {
        return this.tagList;
    }

    public getRemaining() {
        return this.remaining;
    }
}