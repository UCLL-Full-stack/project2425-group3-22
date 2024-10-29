import { User } from './user';

export class Friends {
    private user1: User;
    private user2: User;

    constructor(friends: { user1: User; user2: User }) {
        this.user1 = friends.user1;
        this.user2 = friends.user2;
    }
}
