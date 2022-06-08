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
        this.apiGetClan();
    }

    private async apiGetClan() {
        await axios.get((ClashRoyale.url + "/clans/" + this.tag).replace('#', "%23"), {
            headers: {
                "Authorization": `Bearer ${ClashRoyale.instance}`
            }
        }).then(response => {
            const data = response.data;
            this.name = data.name;
            this.badgeId = data.badgeId;
        }).catch(error => {
            console.log(error);
        });
    }
}