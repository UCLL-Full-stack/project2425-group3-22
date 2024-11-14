import { Achievement as AchievementPrisma } from '@prisma/client';

//TODO: add validation & make type for level?
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

    getAchievementID(): number | undefined {
        return this.achievementID;
    }

    setAchievementID(achievementID: number) {
        this.achievementID = achievementID;
    }

    getName(): string | undefined {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getDescription(): string | undefined {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getLevel(): number | undefined {
        return this.level;
    }

    setLevel(level: number) {
        this.level = level;
    }

    static from({ achievementID, name, description, level }: AchievementPrisma) {
        return new Achievement({ achievementID, name, description, level });
    }
}
