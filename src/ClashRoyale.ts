import { Clan } from "./class/Clan";
import { Player } from "./class/Player";

/**
 * @class ClashRoyale
 * @description Main class of the Clash Royale wrapper
 * @author gonesteves
 */
export class ClashRoyale {
    // singleton
    static instance: ClashRoyale;

    // constantes
    static readonly url = "https://api.clashroyale.com/v1";
    static headers: any;

    // variables
    private apiKey: string;

    private constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
    static login(apiKey: string) {
        this.instance = new ClashRoyale(apiKey);
        this.headers = {
            'Authorization': `Bearer ${ClashRoyale.getApiKey()}`
        }
    }
    static getApiKey(): string {
        return this.instance.apiKey;
    }

    static async getPlayer(playerTag: string): Promise<Player> {
        return await new Player(playerTag).build();
    }

    static async getClan(clanTag: string): Promise<Clan> {
        return await new Clan(clanTag).build();
    }
}