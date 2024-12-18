import { User } from './user';
import { Achievement } from './achievement';
import {
    UserAchievements as UserAchievementsPrisma,
    User as UserPrisma,
    Achievement as AchievementPrisma,
} from '@prisma/client';

export class UserAchievement {
    private userID: number;
    private achievementID: number;
    private achievedLevel: number;
    private achievedAt?: Date;
    private user?: User;
    private achievement?: Achievement;

    constructor({
        userID,
        achievementID,
        achievedLevel,
        achievedAt,
        user,
        achievement,
    }: {
        userID: number;
        achievementID: number;
        achievedLevel: number;
        achievedAt?: Date;
        user?: User;
        achievement?: Achievement;
    }) {
        this.validate;
        this.userID = userID;
        this.achievementID = achievementID;
        this.achievedLevel = achievedLevel;
        this.achievedAt = achievedAt;
        this.user = user;
        this.achievement = achievement;
    }

    getUserID(): number {
        return this.userID;
    }

    getAchievementID(): number {
        return this.achievementID;
    }

    getAchievedLevel(): number {
        return this.achievedLevel;
    }

    setAchievedLevel(achievedLevel: number) {
        this.achievedLevel = achievedLevel;
    }

    getAchievedAt(): Date | undefined {
        return this.achievedAt;
    }

    getUser(): User | undefined {
        return this.user;
    }

    getAchievement(): Achievement | undefined {
        return this.achievement;
    }

    private validate({
        userID,
        achievementID,
        achievedLevel,
    }: {
        userID: number;
        achievementID: number;
        achievedLevel: number;
    }) {
        if (isNaN(userID)) throw new Error('UserID is required and must be a number.');
        if (isNaN(achievementID))
            throw new Error('AchievementID is required and must be a number.');
        if (isNaN(achievedLevel) || achievedLevel < 0)
            throw new Error('Achieved level is required and must be a positive number.');
    }

    static from({
        userID,
        achievementID,
        achievedLevel,
        achievedAt,
        user,
        achievement,
    }: UserAchievementsPrisma & { user?: UserPrisma } & { achievement?: AchievementPrisma }) {
        return new UserAchievement({
            userID: userID,
            achievementID: achievementID,
            achievedLevel: achievedLevel,
            achievedAt: achievedAt,
            user: user ? User.from(user) : undefined,
            achievement: achievement ? Achievement.from(achievement) : undefined,
        });
    }
}
