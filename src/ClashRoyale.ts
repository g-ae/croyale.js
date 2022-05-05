import {Player} from "./class/Player";

/**
 * @class ClashRoyale
 * @description Main class of the Clash Royale wrapper
 * @author gonesteves
 */
export class ClashRoyale {
    static readonly url = "https://api.clashroyale.com/v1";
    readonly apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
    public getPlayer(playerTag: string): Player {
        return new Player(playerTag, this.apiKey);
    }
}