import { serverSearcher } from "@/ts/server/CurrentServer";
import { sanitize } from "@/ts/utils/TextUtils";

export class Tag {
    public type: string;
    public value: string;

    constructor(name: string, value: string) {
        this.value = value.toLowerCase();
        this.type = Tag.tagFromString(name);
    }

    public static tagFromString(name: string) {
        if (serverSearcher?.validTags.has(name)) 
            return name;
        return "invalid";
    }
}

export type OptionalTag = Tag | undefined;


export class TagNode {
    private tagList: Tag[];
    private lastTag: OptionalTag;
    private remaining: string;
    constructor() {
        this.tagList = [];
        this.lastTag = undefined;
        this.remaining = "";
    }

    public addTag(tag: Tag) {
        this.tagList.push(tag);
    }
    public addRemaining(remaining: string) {
        this.remaining += remaining;
    }
    public setLastTag(tag: Tag) {
        this.lastTag = tag;
    }
    public setLastTagFromTaglist() {
        this.setLastTag(this.tagList[this.tagList.length - 1]);
    }

    public getTags() {
        return this.tagList;
    }

    public getRemaining() {
        return this.remaining;
    }
    public getLastTag() {
        return this.lastTag;
    }

    public hasTag(tagname: string) {
        return this.getTag(tagname) !== undefined
    }
    public getTag(tagname: string) {
        for (const tag of this.tagList) {
            if (tag.type == tagname) 
                return tag;
        }
        return undefined;
    }

    public static newFromSearch(search: string) {
        let tagNode = new TagNode();

        if (!search.includes(":")) {
            tagNode.addRemaining(sanitize(search));
            return tagNode;
        }

        const parts = search.split(" ");

        for (const part of parts) {
            if (!part.includes(":")) {
                tagNode.addRemaining(part);
                continue;
            }
            const splittedTag = part.split(":");
            tagNode.addTag(
                new Tag(sanitize(splittedTag[0]), sanitize(splittedTag[1]))
            );
        }
        
        tagNode.setLastTagFromTaglist();
        
        return tagNode;
    }
}