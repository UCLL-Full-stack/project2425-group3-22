export class Achievement {
    private achievementID: number;
    private name: string;
    private description: string;
    private level: number;

    constructor(achievement: {
        achievementID: number;
        name: string;
        description: string;
        level: number;
    }) {
        this.achievementID = achievement.achievementID;
        this.name = achievement.name;
        this.description = achievement.description;
        this.level = achievement.level;
    }
}
