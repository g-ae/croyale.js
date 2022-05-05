import {Arena} from "./Arena";

export class ClanMember {
    public tag: string;
    public name: string;
    public role: string;
    public lastseen: string;
    public level: number;
    public trophies: number;
    public arena: Arena;
    public clanRank: number;
    public donations: number;
    public donationsReceived: number;

    constructor(data: string) {
        const json = JSON.parse(data);
        this.tag = json.tag;
        this.name = json.name;
        this.role = json.role;
        this.lastseen = json.lastseen;
        this.level = json.level;
        this.trophies = json.trophies;
        this.arena = new Arena(json.arena);
        this.clanRank = json.clanRank;
        this.donations = json.donations;
        this.donationsReceived = json.donationsReceived;
    }
}