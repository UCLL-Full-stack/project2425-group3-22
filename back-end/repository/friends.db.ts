import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import database from './database';

const getAllIncomimgFriendRequestsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<FriendRequest> | null> => {
    try {
        const friendRequestsPrisma = await database.friendRequest.findMany({
            where: { receiverID: userID },
            include: { sender: true, receiver: true },
        });

        if (friendRequestsPrisma.length < 1) return null;
        return friendRequestsPrisma.map((friendRequestPrisma) =>
            FriendRequest.from(friendRequestPrisma)
        );
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getAllOutgoingFriendRequestsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<FriendRequest> | null> => {
    try {
        const friendRequestsPrisma = await database.friendRequest.findMany({
            where: { senderID: userID },
            include: { sender: true, receiver: true },
        });

        if (friendRequestsPrisma.length < 1) return null;
        return friendRequestsPrisma.map((friendRequestPrisma) =>
            FriendRequest.from(friendRequestPrisma)
        );
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getAllFriendsForUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<Friends> | null> => {
    try {
        const friendsPrisma = await database.friends.findMany({
            where: { user1ID: userID },
            include: { user1: true, user2: true },
        });

        if (friendsPrisma.length < 1) return null;
        return friendsPrisma.map((friendPrisma) => Friends.from(friendPrisma));
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
