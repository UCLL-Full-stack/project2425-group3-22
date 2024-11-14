import { User } from './user';
import { Friends as FriendsPrisma, User as UserPrisma } from '@prisma/client';

// TODO: add validation
export class Friends {
    private user1: User;
    private user2: User;

    constructor(friends: { user1: User; user2: User }) {
        this.user1 = friends.user1;
        this.user2 = friends.user2;
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

    static from({ user1, user2 }: FriendsPrisma & { user1: UserPrisma; user2: UserPrisma }) {
        return new Friends({ user1: User.from(user1), user2: User.from(user2) });
    }
}
