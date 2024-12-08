import { FriendRequest } from '../model/friendRequest';
import { Friends } from '../model/friends';
import friendsDB from '../repository/friends.db';
import userDB from '../repository/user.db';
import { FriendsInfoResponse, FriendInfoResponse } from '../types';

const getFriendsInfoForUser = async (userID: number): Promise<FriendsInfoResponse> => {
    const friends = await friendsDB.getAllFriendsForUser({ userID });
    const incomingFriendRequests = await friendsDB.getAllIncomingFriendRequestsForUser({ userID });
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

const getFriendsByUsername = async (
    userID: number,
    username: string
): Promise<Array<FriendInfoResponse>> => {
    const friends = await friendsDB.getFriendsByUsername({ userID, username });
    if (!friends) throw new Error(`No friends with username containing '${username}' found`);

    return friends.map(
        (friend) =>
            <FriendInfoResponse>{
                userID: friend.getUser1ID() === userID ? friend.getUser2ID() : friend.getUser1ID(),
                username:
                    friend.getUser1ID() === userID
                        ? friend.getUser2()?.getUsername()
                        : friend.getUser1()?.getUsername(),
            }
    );
};

const sendFriendRequest = async (
    senderID: number,
    receiverID: number
): Promise<FriendInfoResponse> => {
    const receiverExists = await userDB.getUserByID({ userID: receiverID });
    if (!receiverExists)
        throw new Error('The user you want to send the friendrequest to does not exist.');

    const friendRequestToSend = new FriendRequest({ senderID, receiverID });
    const friendRequestAllowed = await friendsDB.friendRequestAllowed(friendRequestToSend);
    if (friendRequestAllowed) {
        throw new Error(friendRequestAllowed);
    }

    const sentFriendRequest = await friendsDB.sendFriendRequest(friendRequestToSend);
    if (!sentFriendRequest) throw new Error('Error occured sending friend request.');

    return <FriendInfoResponse>{
        userID: sentFriendRequest.getReceiverID(),
        username: sentFriendRequest.getReceiver()?.getUsername(),
    };
};

const cancelFriendRequest = async (senderID: number, receiverID: number): Promise<String> => {
    const receiverExists = await userDB.getUserByID({ userID: receiverID });
    if (!receiverExists) throw new Error('The user you sent the friendrequest to does not exist.');

    const friendRequestToCancel = new FriendRequest({ senderID, receiverID });
    const cancelledFriendRequest = await friendsDB.cancelFriendRequest(friendRequestToCancel);

    if (!cancelledFriendRequest) throw new Error('Error occured cancelling friendrequest.');
    return 'Friendrequest successfully cancelled.';
};

const acceptFriendRequest = async (
    senderID: number,
    receiverID: number
): Promise<FriendInfoResponse> => {
    const senderExists = await userDB.getUserByID({ userID: senderID });
    if (!senderExists)
        throw new Error('The user whose friendrequest you want to accept does not exist.');

    const friendRequestToAccept = new FriendRequest({ senderID, receiverID });
    const acceptedFriendRequest = await friendsDB.acceptFriendRequest(friendRequestToAccept);

    if (!acceptedFriendRequest) throw new Error('Error occured accepting friendrequest.');
    return <FriendInfoResponse>{
        userID: acceptedFriendRequest.getUser1ID(),
        username: acceptedFriendRequest.getUser1()?.getUsername(),
    };
};

const refuseFriendRequest = async (senderID: number, receiverID: number): Promise<String> => {
    const senderExists = await userDB.getUserByID({ userID: senderID });
    if (!senderExists)
        throw new Error('The user whose friendrequest you want to refuse does not exist.');

    const friendRequestToRefuse = new FriendRequest({ senderID, receiverID });
    const refusedFriendRequest = await friendsDB.refuseFriendRequest(friendRequestToRefuse);

    if (!refusedFriendRequest) throw new Error('Error occured refusing friendrequest.');
    return 'Friendrequest successfully refused.';
};

const removeFriend = async (
    loggedInUserID: number,
    userID: number
): Promise<FriendInfoResponse> => {
    const friendsToRemove = new Friends({ user1ID: loggedInUserID, user2ID: userID });
    const removedFriends = await friendsDB.removeFriend(friendsToRemove);

    if (!removedFriends) throw new Error('Error occured removing friend.');
    return <FriendInfoResponse>{
        userID:
            removedFriends.getUser1ID() === loggedInUserID
                ? removedFriends.getUser2ID()
                : removedFriends.getUser1ID(),
        username:
            removedFriends.getUser1ID() === loggedInUserID
                ? removedFriends.getUser2()?.getUsername()
                : removedFriends.getUser1()?.getUsername(),
    };
};

export default {
    getFriendsInfoForUser,
    getFriendsByUsername,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    removeFriend,
};
