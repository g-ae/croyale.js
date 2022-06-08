import {Clan} from "./Clan";
import {Arena} from "./Arena";
import {ClashRoyale} from "../ClashRoyale";
import axios from 'axios';
import {LeagueStatistics} from "./LeagueStatistics";

export class Player {
    public name: string;
    public tag: string;
    public clan: any;
    public arena: any;

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

    constructor(tag: string) {
        // always have the "#" before the tag
        if (tag.startsWith("#")) {
            this.tag = tag;
        } else {
            this.tag = "#" + tag;
        }
        this.apiGetPlayer().then(player => {
            return player;
        }).catch(e => {
            console.log(e)
            return null;
        });
    }

    /**
     * Get the player's info
     */
    private async apiGetPlayer(): Promise<Player> {
        await axios.get((ClashRoyale.url + "/players/" + this.tag).replace('#', '%23'), {
            headers: ClashRoyale.headers
        }).then(response => {
            const data = response.data;
            this.name = data.name;
            this.clan = () => {
                return new Clan(data.clan.tag);
            };
            console.log(this.clan);
            this.arena = new Arena(data.arena.id);
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

            return this;
        }).catch(error => console.log(error));
        return null;
    }
}