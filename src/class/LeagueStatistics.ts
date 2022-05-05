export class LeagueStatistics {
    public rank: number;
    public bestTrophies: number;
    public currentTrophies: number;
    public id: string;

    constructor(data: {"rank": number, "bestTrophies": number, "trophies": number, "id": string}) {
        this.rank = data.rank;
        this.bestTrophies = data.bestTrophies;
        this.currentTrophies = data.trophies;
        this.id = data.id;
    }
}