import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import database from './database';
import { ReturnFriendRequest, ReturnFriend } from '../types/index';

const getAllIncomimgFriendRequestsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<ReturnFriendRequest> | null> => {
    try {
        const friendRequestsPrisma = await database.friendRequest.findMany({
            where: { receiverID: userID },
            include: { sender: true, receiver: true },
        });

        if (friendRequestsPrisma.length < 1) return null;
        return friendRequestsPrisma.map((friendRequestPrisma) => {
            const friendRequest = <ReturnFriendRequest>{
                senderID: friendRequestPrisma.senderID,
                senderUsername: friendRequestPrisma.sender.username,
                receiverID: friendRequestPrisma.receiverID,
                receiverUsername: friendRequestPrisma.receiver.username,
            };
            return friendRequest;
        });
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getAllOutgoingFriendRequestsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<ReturnFriendRequest> | null> => {
    try {
        const friendRequestsPrisma = await database.friendRequest.findMany({
            where: { senderID: userID },
            include: { sender: true, receiver: true },
        });

        if (friendRequestsPrisma.length < 1) return null;
        return friendRequestsPrisma.map((friendRequestPrisma) => {
            const friendRequest = <ReturnFriendRequest>{
                senderID: friendRequestPrisma.senderID,
                senderUsername: friendRequestPrisma.sender.username,
                receiverID: friendRequestPrisma.receiverID,
                receiverUsername: friendRequestPrisma.receiver.username,
            };
            return friendRequest;
        });
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getAllFriendsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<ReturnFriend> | null> => {
    try {
        const friendsPrisma = await database.friends.findMany({
            where: { user1ID: userID },
            include: { user1: true, user2: true },
        });

        if (friendsPrisma.length < 1) return null;
        return friendsPrisma.map((friendPrisma) => {
            const friend = <ReturnFriend>{
                user1ID: friendPrisma.user1ID,
                user1Username: friendPrisma.user1.username,
                user2ID: friendPrisma.user2ID,
                user2Username: friendPrisma.user2.username,
            };
            return friend;
        });
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const sendFriendRequest = async (): Promise<null> => {
    //TODO: create and save a friend request
    return null;
};

const denyFriendRequest = async (): Promise<null> => {
    //TODO: remove a friend request (denied by receiver || cancelled by sender)
    return null;
};

const acceptFriendRequest = async (): Promise<null> => {
    //TODO: remove friendrequest, but create friends
    return null;
};

const removeFriend = async (): Promise<null> => {
    //TODO: remove friends
    return null;
};

export default {
    getAllIncomimgFriendRequestsForUser,
    getAllOutgoingFriendRequestsForUser,
    getAllFriendsForUser,
};
