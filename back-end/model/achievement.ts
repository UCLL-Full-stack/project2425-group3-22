import { Achievement as AchievementPrisma, Stat as StatPrisma } from '@prisma/client';
import { Stat } from './stat';

export class Achievement {
    private achievementID: number;
    private achievementCode: string;
    private name: string;
    private description: string;
    private levels: Array<number>;
    private levelsCriteria: Array<number>;
    private statID: number;
    private stat?: Stat;

    constructor({
        achievementID,
        achievementCode,
        name,
        description,
        levels,
        levelsCriteria,
        statID,
        stat,
    }: {
        achievementID: number;
        achievementCode: string;
        name: string;
        description: string;
        levels: Array<number>;
        levelsCriteria: Array<number>;
        statID: number;
        stat?: Stat;
    }) {
        this.validate({ achievementCode, name, description, levels, levelsCriteria, statID });
        this.achievementID = achievementID;
        this.achievementCode = achievementCode;
        this.name = name;
        this.description = description;
        this.levels = levels;
        this.levelsCriteria = levelsCriteria;
        this.statID = statID;
        this.stat = stat;
    }

    getAchievementID(): number {
        return this.achievementID;
    }

    getAchievementCode(): string {
        return this.achievementCode;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getLevels(): Array<number> {
        return this.levels;
    }

    getLevelsCriteria(): Array<number> {
        return this.levelsCriteria;
    }

    getStatID(): number {
        return this.statID;
    }

    getStat(): Stat | undefined {
        return this.stat;
    }

    private validate({
        achievementCode,
        name,
        description,
        levels,
        levelsCriteria,
        statID,
    }: {
        achievementCode: string;
        name: string;
        description: string;
        levels: Array<number>;
        levelsCriteria: Array<number>;
        statID: number;
    }) {
        if (!achievementCode) throw new Error('Achievement code is required.');
        if (!name || name.length > 100)
            throw new Error('Name is required and cannot be longer than 100 characters.');
        if (!description || description.length > 255)
            throw new Error('Description is required and cannot be longer than 255 characters.');
        if (
            !Array.isArray(levels) ||
            levels.every((level) => typeof level !== 'number') ||
            levels.length > 10
        )
            throw new Error('Levels is required and must be an array of maximum 10 whole numbers.');
        if (
            !Array.isArray(levelsCriteria) ||
            levelsCriteria.every((levelCriteria) => typeof levelCriteria !== 'number') ||
            levelsCriteria.length !== levels.length
        )
            throw new Error(
                'Levels criteria is required and must be an array the same lenght as levels, containing only whole numbers.'
            );
        if (isNaN(statID)) throw new Error('StatID is required ans must be a number.');
    }

    static from({
        achievementID,
        achievementCode,
        name,
        description,
        levels,
        levelsCriteria,
        statID,
        stat,
    }: AchievementPrisma & { stat?: StatPrisma }) {
        return new Achievement({
            achievementID,
            achievementCode,
            name,
            description,
            levels,
            levelsCriteria,
            statID,
            stat: stat ? Stat.from(stat) : undefined,
        });
    }
}
