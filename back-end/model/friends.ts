import { User } from './user';
import { Friends as FriendsPrisma, User as UserPrisma } from '@prisma/client';

export class Friends {
    private user1ID: number;
    private user2ID: number;
    private user1?: User;
    private user2?: User;

    constructor({
        user1ID,
        user2ID,
        user1,
        user2,
    }: {
        user1ID: number;
        user2ID: number;
        user1?: User;
        user2?: User;
    }) {
        this.validate({ user1ID, user2ID });
        this.user1ID = user1ID;
        this.user2ID = user2ID;
        this.user1 = user1;
        this.user2 = user2;
    }

    getUser1ID(): number {
        return this.user1ID;
    }

    setUser1ID(user1ID: number) {
        this.user1ID = user1ID;
    }

    getUser2ID(): number {
        return this.user2ID;
    }

    setUser2ID(user2ID: number) {
        this.user2ID = user2ID;
    }

    getUser1(): User | undefined {
        return this.user1;
    }

    setUser1(user1: User) {
        this.user1 = user1;
    }

    getUser2(): User | undefined {
        return this.user2;
    }

    setUser2(user2: User) {
        this.user2 = user2;
    }

    private validate({ user1ID, user2ID }: { user1ID: number; user2ID: number }) {
        if (
            !Number.isInteger(user1ID) ||
            user1ID <= 0 ||
            !Number.isInteger(user2ID) ||
            user2ID <= 0
        )
            throw new Error(
                "Both userID's are required and both must be positive and whole numbers."
            );
    }

    static from({
        user1ID,
        user1,
        user2ID,
        user2,
    }: FriendsPrisma & { user1?: UserPrisma; user2?: UserPrisma }) {
        return new Friends({
            user1ID: user1ID,
            user2ID: user2ID,
            user1: user1 ? User.from(user1) : undefined,
            user2: user2 ? User.from(user2) : undefined,
        });
    }
}
