import { User } from './user';

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
}
