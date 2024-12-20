import { User } from './user';
import { FriendRequest as FriendRequestPrisma, User as UserPrisma } from '@prisma/client';

export class FriendRequest {
    private senderID: number;
    private receiverID: number;
    private sender?: User;
    private receiver?: User;

    constructor({
        senderID,
        receiverID,
        sender,
        receiver,
    }: {
        senderID: number;
        receiverID: number;
        sender?: User;
        receiver?: User;
    }) {
        this.validate({ senderID, receiverID });
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.sender = sender;
        this.receiver = receiver;
    }

    getSenderID(): number {
        return this.senderID;
    }

    setSenderID(senderID: number) {
        this.senderID = senderID;
    }

    getReceiverID(): number {
        return this.receiverID;
    }

    setReceiverID(receiverID: number) {
        this.receiverID = receiverID;
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

    private validate({ senderID, receiverID }: { senderID: number; receiverID: number }) {
        if (!Number.isInteger(senderID) || senderID <= 0)
            throw new Error('SenderID is required and must be a positive and whole number.');
        if (!Number.isInteger(receiverID) || receiverID <= 0)
            throw new Error('ReceiverID is required and must be a positive and whole number.');
    }

    static from({
        senderID,
        sender,
        receiverID,
        receiver,
    }: FriendRequestPrisma & { sender?: UserPrisma; receiver?: UserPrisma }) {
        return new FriendRequest({
            senderID,
            receiverID,
            sender: sender ? User.from(sender) : undefined,
            receiver: receiver ? User.from(receiver) : undefined,
        });
    }
}
