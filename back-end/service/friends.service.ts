import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import friendsDB from '../repository/friends.db';
import { FriendsInfoResponse, FriendInfoResponse } from '../types';

const getFriendsInfoForUser = async (userID: number): Promise<FriendsInfoResponse> => {
    const friends = await friendsDB.getAllFriendsForUser({ userID });
    const incomingFriendRequests = await friendsDB.getAllIncomimgFriendRequestsForUser({ userID });
    const outgoingFriendRequests = await friendsDB.getAllOutgoingFriendRequestsForUser({ userID });

    const friendsInfo = !friends
        ? []
        : friends.map(
              (friend) =>
                  <FriendInfoResponse>{
                      userID:
                          friend.getUser1ID() === userID
                              ? friend.getUser2ID()
                              : friend.getUser1ID(),
                      username:
                          friend.getUser1ID() === userID
                              ? friend.getUser2()?.getUsername()
                              : friend.getUser1()?.getUsername(),
                  }
          );
    const incomingFriendRequestsInfo = !incomingFriendRequests
        ? []
        : incomingFriendRequests.map(
              (incomingFriendRequest) =>
                  <FriendInfoResponse>{
                      userID: incomingFriendRequest.getSender()?.getUserID(),
                      username: incomingFriendRequest.getSender()?.getUsername(),
                  }
          );
    const outgoingFriendRequestsInfo = !outgoingFriendRequests
        ? []
        : outgoingFriendRequests.map(
              (outgoingFriendRequest) =>
                  <FriendInfoResponse>{
                      userID: outgoingFriendRequest.getReceiver()?.getUserID(),
                      username: outgoingFriendRequest.getReceiver()?.getUsername(),
                  }
          );
    return <FriendsInfoResponse>{
        friends: friendsInfo,
        incoming: incomingFriendRequestsInfo,
        outgoing: outgoingFriendRequestsInfo,
    };
};

const sendFriendRequest = async (
    senderID: number,
    receiverID: number
): Promise<FriendInfoResponse> => {
    const friendRequest = new FriendRequest({ senderID, receiverID });

    const sentFriendRequest = await friendsDB.sendFriendRequest(friendRequest);
    if (!sentFriendRequest) throw new Error('Error occured sending friend request.');

    return <FriendInfoResponse>{
        userID: sentFriendRequest.getReceiverID(),
        username: sentFriendRequest.getReceiver()?.getUsername(),
    };
};

const removeFriend = async (user1ID: number, user2ID: number): Promise<FriendInfoResponse> => {
    const friendsToRemove = new Friends({ user1ID, user2ID });
    const removedFriends = await friendsDB.removeFriend(friendsToRemove);

    if (!removedFriends) throw new Error('Error occured removing friend.');
    return <FriendInfoResponse>{
        userID: 1,
        username: 'peepee',
    };
};

export default {
    getFriendsInfoForUser,
    sendFriendRequest,
    removeFriend,
};
