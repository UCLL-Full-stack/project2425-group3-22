import { User } from './user';

// TODO: add validation
export class FriendRequest {
    private sender: User;
    private receiver: User;

    constructor(friends: { sender: User; receiver: User }) {
        this.sender = friends.sender;
        this.receiver = friends.receiver;
    }

    getSender(): User | undefined {
        return this.sender;
    }

    setSender(sender: User) {
        this.sender = sender;
    }

    getReceiver(): User | undefined {
        return this.receiver;
    }

    setReceiver(receiver: User) {
        this.receiver = receiver;
    }
}
