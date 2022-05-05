import {Clan} from "./Clan";
import {Arena} from "./Arena";
import {ClashRoyale} from "../ClashRoyale";
import axios from 'axios';
import {LeagueStatistics} from "./LeagueStatistics";

export class Player {
    public name: string;
    public tag: string;
    public clan: Clan;
    public arena: Arena;

    public level: number;
    public exp: number;
    public stars: number;
    public currentTrophies: number;
    public bestTrophies: number;
    public totalDonations: number;

    public wins: number;
    public threeCrownWins: number;
    public losses: number;
    public totalBattles: number;

    public bestSeason: LeagueStatistics;
    public currentSeason: LeagueStatistics;
    public previousSeason: LeagueStatistics;

    constructor(tag: string, apiKey: string) {
        // always have the "#" before the tag
        if (tag.startsWith("#")) {
            this.tag = tag;
        } else {
            this.tag = "#" + tag;
        }
        this.apiGetPlayer(apiKey);
    }

    /**
     * Get the player's info
     * @param apiKey Clash Royale's API key
     */
    private async apiGetPlayer(apiKey: string): Promise<void> {
        await axios.get((ClashRoyale.url + "/players/" + this.tag).replace('#', '%23'), {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }).then(response => {
            const data = response.data;
            this.name = data.name;
            this.clan = new Clan(data.clan.tag, apiKey);
            this.arena = new Arena(data.arena.id, apiKey);
            this.level = data.expLevel;
            this.exp = data.expPoints;
            this.stars = data.starPoints;
            this.currentTrophies = data.trophies;
            this.bestTrophies = data.bestTrophies;
            this.totalDonations = data.totalDonations;
            this.wins = data.wins;
            this.threeCrownWins = data.threeCrownWins;
            this.losses = data.losses;
            this.totalBattles = data.battleCount;
            this.bestSeason = new LeagueStatistics(data.bestSeason);
            this.currentSeason = new LeagueStatistics(data.currentSeason);
            this.previousSeason = new LeagueStatistics(data.previousSeason);
        }).catch(error => {
            console.log(error);
        });
    }
}