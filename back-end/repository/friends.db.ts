import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import { FriendStats } from '../types';
import database from '../util/database';

const checkIfFriends = async ({
    user1ID,
    user2ID,
}: {
    user1ID: number;
    user2ID: number;
}): Promise<Boolean> => {
    try {
        const friendPrisma = await database.friends.findFirst({
            where: {
                OR: [
                    { user1ID: user1ID, user2ID: user2ID },
                    { user1ID: user2ID, user2ID: user1ID },
                ],
            },
        });

        if (!friendPrisma) return false;
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getFriendStatsByUser = async ({ userID }: { userID: number }): Promise<FriendStats> => {
    try {
        const countFriendsPrisma = await database.friends.count({
            where: {
                OR: [{ user1ID: userID }, { user2ID: userID }],
            },
        });
        const countFriendRequestsPrisma = await database.friendRequest.count({
            where: {
                receiverID: userID,
            },
        });

        return <FriendStats>{
            friends: countFriendsPrisma ?? 0,
            friendRequests: countFriendRequestsPrisma ?? 0,
        };
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getFriendByUser = async ({
    userID,
    friendID,
}: {
    userID: number;
    friendID: number;
}): Promise<Friends | null> => {
    try {
        const friendsPrisma = await database.friends.findFirst({
            where: {
                OR: [
                    { user1ID: userID, user2ID: friendID },
                    { user1ID: friendID, user2ID: userID },
                ],
            },
            include: { user1: true, user2: true },
        });

        if (!friendsPrisma) return null;
        return Friends.from(friendsPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getAllIncomingFriendRequestsByUser = async ({
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

const getAllOutgoingFriendRequestsByUser = async ({
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

const getAllFriendsByUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<Friends> | null> => {
    try {
        const friendsPrisma = await database.friends.findMany({
            where: { OR: [{ user1ID: userID }, { user2ID: userID }] },
            include: { user1: true, user2: true },
        });

        if (friendsPrisma.length < 1) return null;
        return friendsPrisma.map((friendPrisma) => Friends.from(friendPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getFriendsByUsername = async ({
    userID,
    username,
}: {
    userID: number;
    username: string;
}): Promise<Array<Friends> | null> => {
    try {
        const friendsPrisma = await database.friends.findMany({
            where: {
                OR: [
                    { user1: { username: { contains: username } }, user2ID: userID },
                    { user1ID: userID, user2: { username: { contains: username } } },
                ],
            },
            include: { user1: true, user2: true },
        });
        if (friendsPrisma.length < 1) return null;

        return friendsPrisma.map((friendPrisma) => Friends.from(friendPrisma));
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

const checkIfFriendRequestAllowed = async (
    friendRequest: FriendRequest
): Promise<string | null> => {
    try {
        const alreadySent = await getFriendRequest({
            senderID: friendRequest.getSenderID(),
            receiverID: friendRequest.getReceiverID(),
        });
        if (alreadySent) {
            return `You have already sent a friendrequest to ${alreadySent
                .getReceiver()
                ?.getUsername()}.`;
        }

        const alreadyReceived = await getFriendRequest({
            senderID: friendRequest.getReceiverID(),
            receiverID: friendRequest.getSenderID(),
        });
        if (alreadyReceived) {
            return `You already have a friendrequest incoming from ${alreadyReceived
                .getReceiver()
                ?.getUsername()}.`;
        }

        const alreadyFriends = await database.friends.findFirst({
            where: {
                OR: [
                    {
                        user1ID: friendRequest.getSenderID(),
                        user2ID: friendRequest.getReceiverID(),
                    },
                    {
                        user1ID: friendRequest.getSenderID(),
                        user2ID: friendRequest.getReceiverID(),
                    },
                ],
            },
            include: { user1: true, user2: true },
        });
        if (alreadyFriends) {
            return `You are already friends with ${
                alreadyFriends.user1ID === friendRequest.getSenderID()
                    ? alreadyFriends.user2.username
                    : alreadyFriends.user1.username
            }.`;
        }

        return null;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const sendFriendRequest = async (friendRequest: FriendRequest): Promise<FriendRequest | null> => {
    try {
        const friendRequestPrisma = await database.friendRequest.create({
            data: {
                sender: { connect: { userID: friendRequest.getSenderID() } },
                receiver: { connect: { userID: friendRequest.getReceiverID() } },
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

const cancelFriendRequest = async (friendRequest: FriendRequest): Promise<Boolean> => {
    try {
        await database.friendRequest.deleteMany({
            where: {
                senderID: friendRequest.getSenderID(),
                receiverID: friendRequest.getReceiverID(),
            },
        });
        return true;
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

const refuseFriendRequest = async (friendRequest: FriendRequest): Promise<Boolean> => {
    try {
        await database.friendRequest.deleteMany({
            where: {
                senderID: friendRequest.getSenderID(),
                receiverID: friendRequest.getReceiverID(),
            },
        });
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const removeFriend = async (friends: Friends): Promise<Friends | null> => {
    try {
        const friendsPrisma = await database.friends.findFirst({
            where: {
                OR: [
                    { user1ID: friends.getUser1ID(), user2ID: friends.getUser2ID() },
                    { user1ID: friends.getUser2ID(), user2ID: friends.getUser1ID() },
                ],
            },
            include: { user1: true, user2: true },
        });

        if (!friendsPrisma) return null;
        friends = Friends.from(friendsPrisma);

        await database.friends.deleteMany({
            where: {
                OR: [
                    { user1ID: friends.getUser1ID(), user2ID: friends.getUser2ID() },
                    { user1ID: friends.getUser2ID(), user2ID: friends.getUser1ID() },
                ],
            },
        });

        return friends;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    checkIfFriends,
    getFriendStatsByUser,
    getFriendByUser,
    getAllIncomingFriendRequestsByUser,
    getAllOutgoingFriendRequestsByUser,
    getAllFriendsByUser,
    getFriendsByUsername,
    getFriendRequest,
    checkIfFriendRequestAllowed,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    removeFriend,
};
