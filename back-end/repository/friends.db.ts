import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import database from '../util/database';

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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

// TODO: check if there is already an incoming friendrequest from the person you send to
const sendFriendRequest = async (friendRequest: FriendRequest): Promise<FriendRequest | null> => {
    try {
        const friendRequestPrisma = await database.friendRequest.create({
            data: {
                sender: { connect: { userID: friendRequest.getSenderID() } },
                receiver: { connect: { userID: friendRequest.getReceiverID() } },
                // senderID: friendRequest.getSenderID(),
                // receiverID: friendRequest.getReceiverID(),
            },
            include: { sender: true, receiver: true },
        });
        if (!friendRequestPrisma) return null;
        return FriendRequest.from(friendRequestPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

// TODO: only return one delete instance, since there can only be one
// TODO: returns null when friend requests still exists (error), and the removed friendrequest when it's deleted
const refuseFriendRequest = async (friendRequest: FriendRequest): Promise<FriendRequest | null> => {
    try {
        await database.friendRequest.deleteMany({
            where: {
                senderID: friendRequest.getSenderID(),
                receiverID: friendRequest.getReceiverID(),
            },
        });
        const friendRequestExists = await getFriendRequest({
            senderID: friendRequest.getSenderID(),
            receiverID: friendRequest.getReceiverID(),
        });

        if (friendRequestExists) return null;
        return friendRequest;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const acceptFriendRequest = async (friendRequest: FriendRequest): Promise<Friends | null> => {
    try {
        const friendsPrisma = await database.friends.create({
            data: {
                user1: { connect: { userID: friendRequest.getSenderID() } },
                user2: { connect: { userID: friendRequest.getReceiverID() } },
            },
            include: { user1: true, user2: true },
        });
        await database.friendRequest.deleteMany({
            where: {
                senderID: friendRequest.getSenderID(),
                receiverID: friendRequest.getReceiverID(),
            },
        });

        if (!friendsPrisma) return null;
        return Friends.from(friendsPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const removeFriend = async (friends: Friends): Promise<Friends | null> => {
    try {
        const friendsPrisma1 = await database.friends.findFirst({
            where: { user1ID: friends.getUser1ID(), user2ID: friends.getUser2ID() },
            include: { user1: true, user2: true },
        });
        const friendsPrisma2 = await database.friends.findFirst({
            where: { user1ID: friends.getUser2ID(), user2ID: friends.getUser1ID() },
            include: { user1: true, user2: true },
        });

        const friendsPrisma = friendsPrisma1 ?? friendsPrisma2;
        if (!friendsPrisma) return null;
        friends = Friends.from(friendsPrisma);

        // await database.friends.deleteMany({
        //     where: {
        //         user1ID: friends.getUser1ID(),
        //         user2ID: friends.getUser2ID(),
        //     },
        // });

        // TODO: remove ! since friends shouldn't exists after delete
        if (!friendsPrisma) return null;
        return friends;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getFriendRequest = async ({
    senderID,
    receiverID,
}: {
    senderID: number;
    receiverID: number;
}): Promise<FriendRequest | null> => {
    try {
        const friendRequestPrisma = await database.friendRequest.findFirst({
            where: {
                senderID: senderID,
                receiverID: receiverID,
            },
            include: { sender: true, receiver: true },
        });

        if (!friendRequestPrisma) return null;
        return FriendRequest.from(friendRequestPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllIncomimgFriendRequestsForUser,
    getAllOutgoingFriendRequestsForUser,
    getAllFriendsForUser,
    sendFriendRequest,
    refuseFriendRequest,
    acceptFriendRequest,
    removeFriend,
};
