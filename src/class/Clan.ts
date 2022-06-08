import axios from 'axios';
import {ClashRoyale} from "../ClashRoyale";
import {ClanMember} from "./ClanMember";

export class Clan {
    public tag: string;
    public name: string;
    public type: string;
    public description: string;
    public badgeId: number;
    public clanScore: number;
    public clanWarTrophies: number;
    public location: {
        id: number;
        name: string;
        isCountry: boolean;
        countryCode: string;
    }
    public requiredTrophies: number;
    public donationsPerWeek: number;
    public members: number;
    public memberList: ClanMember[];

    constructor(tag: string) {
        if (tag.startsWith("#")) {
            this.tag = tag;
        } else {
            this.tag = "#" + tag;
        }
        this.tag = tag;
    }

    public async build(): Promise<Clan> {
        try {
            const response = await axios.get((ClashRoyale.url + "/clans/" + this.tag).replace('#', "%23"), ClashRoyale.headers)
            
            const data = response.data;
            this.name = data.name;
            this.badgeId = data.badgeId;
            return this;
        } catch(err) {
            console.log(err);
            return this;
        }
    }
}