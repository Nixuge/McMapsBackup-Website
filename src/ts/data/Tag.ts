import { serverValidTags } from "@/ts/servers/CurrentServerRedirect";

export class Tag {
    public type: string;
    public value: string;

    constructor(name: string, value: string) {
        this.value = value.toLowerCase();
        this.type = Tag.tagFromString(name);
    }

    public static tagFromString(name: string) {
        if (serverValidTags.includes(name)) 
            return name;
        return "invalid";
    }
}

export type OptionalTag = Tag | undefined;


export class TagNode {
    private tagList: Tag[];
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

    public hasTag(tagname: string) {
        for (const tag of this.tagList) {
            if (tag.type == tagname) 
                return true;
        }
        return false;
    }
    public getTag(tagname: string) {
        for (const tag of this.tagList) {
            if (tag.type == tagname) 
                return tag;
        }
        return undefined;
    }
}