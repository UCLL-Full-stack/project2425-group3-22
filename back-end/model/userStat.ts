import { User } from './user';
import { Stat } from './stat';
import {
    UserStats as UserStatPrisma,
    User as UserPrisma,
    Stat as StatPrisma,
} from '@prisma/client';

export class UserStat {
    private userID: number;
    private statID: number;
    private statValue: number;
    private updatedAt?: Date;
    private user?: User;
    private stat?: Stat;

    constructor({
        userID,
        statID,
        statValue,
        updatedAt,
        user,
        stat,
    }: {
        userID: number;
        statID: number;
        statValue: number;
        updatedAt?: Date;
        user?: User;
        stat?: Stat;
    }) {
        this.validate({ userID, statID, statValue });
        this.userID = userID;
        this.statID = statID;
        this.statValue = statValue;
        this.updatedAt = updatedAt;
        this.user = user;
        this.stat = stat;
    }

    getUserID(): number {
        return this.userID;
    }

    getStatID(): number {
        return this.statID;
    }

    getStatValue(): number {
        return this.statValue;
    }

    setStatValue(statValue: number) {
        this.statValue = statValue;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    getUser(): User | undefined {
        return this.user;
    }

    getStat(): Stat | undefined {
        return this.stat;
    }

    private validate({
        userID,
        statID,
        statValue,
    }: {
        userID: number;
        statID: number;
        statValue: number;
    }) {
        if (!Number.isInteger(userID) || userID <= 0)
            throw new Error('UserID is required and must be a positive whole number.');
        if (!Number.isInteger(statID) || statID <= 0)
            throw new Error('StatID is required and must be a positive whole number.');
        if (!Number.isInteger(statValue) || statValue < 0)
            throw new Error('Stat value is required and must be a positive whole number.');
    }

    static from({
        userID,
        statID,
        statValue,
        updatedAt,
        user,
        stat,
    }: UserStatPrisma & { user?: UserPrisma } & { stat?: StatPrisma }) {
        return new UserStat({
            userID: userID,
            statID: statID,
            statValue: statValue,
            updatedAt: updatedAt,
            user: user ? User.from(user) : undefined,
            stat: stat ? Stat.from(stat) : undefined,
        });
    }
}
