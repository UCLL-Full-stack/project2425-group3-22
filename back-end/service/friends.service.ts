import friendsDB from '../repository/friends.db';
import { FriendsInfoResponse, FriendInfoResponse } from '../types';

const getFriendsInfoForUser = async (userID: number): Promise<FriendsInfoResponse> => {
    const friends = await friendsDB.getAllFriendsForUser({ userID });
    const incomingFriendRequests = await friendsDB.getAllIncomimgFriendRequestsForUser({ userID });
    const outgoingFriendRequests = await friendsDB.getAllOutgoingFriendRequestsForUser({ userID });

    const friendsInfo = friends.map(
        (friend) =>
            <FriendInfoResponse>{
                userID: friend.getUser1ID() === userID ? friend.getUser2ID() : friend.getUser1ID(),
                username:
                    friend.getUser1ID() === userID
                        ? friend.getUser2().getUsername()
                        : friend.getUser1().getUsername(),
            }
    );
    const incomingFriendRequestsInfo = incomingFriendRequests.map(
        (incomingFriendRequest) =>
            <FriendInfoResponse>{
                userID: incomingFriendRequest.getSender().getUserID(),
                username: incomingFriendRequest.getSender().getUsername(),
            }
    );
    const outgoingFriendRequestsInfo = outgoingFriendRequests.map(
        (outgoingFriendRequest) =>
            <FriendInfoResponse>{
                userID: outgoingFriendRequest.getReceiver().getUserID(),
                username: outgoingFriendRequest.getReceiver().getUsername(),
            }
    );
    return <FriendsInfoResponse>{
        friends: friendsInfo,
        incoming: incomingFriendRequestsInfo,
        outgoing: outgoingFriendRequestsInfo,
    };
};

export default {
    getFriendsInfoForUser,
};
