import { User } from './user';

export class FriendRequest {
    private sender: User;
    private receiver: User;

    constructor(friends: { sender: User; receiver: User }) {
        this.sender = friends.sender;
        this.receiver = friends.receiver;
    }
}
