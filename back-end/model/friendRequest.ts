import { User } from './user';
import { FriendRequest as FriendRequestPrisma, User as UserPrisma } from '@prisma/client';

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

    // static from({
    //     sender,
    //     receiver,
    // }: FriendRequestPrisma & { sender: UserPrisma; receiver: UserPrisma }) {
    //     return new FriendRequest({ sender: User.from(sender), receiver: User.from(receiver) });
    // }
}
