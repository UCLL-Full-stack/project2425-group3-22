import friendsDB from '../repository/friends.db';
import { ReturnFriendRequest, ReturnFriend } from '../types';

const getAllIncomimgFriendRequestsForUser = async (
    userID: number
): Promise<Array<ReturnFriendRequest>> => {
    const friendRequests = await friendsDB.getAllIncomimgFriendRequestsForUser({ userID });
    if (!friendRequests) throw new Error('No incoming friend requests.');
    return friendRequests.map(
        (friendRequest) =>
            <ReturnFriendRequest>{
                senderID: friendRequest.getSenderID(),
                senderUsername: friendRequest.getSender()?.getUsername() ?? 'unknown',
                receiverID: friendRequest.getReceiverID(),
                receiverUsername: friendRequest.getReceiver()?.getUsername() ?? 'unknown',
            }
    );
};

export default {
    getAllIncomimgFriendRequestsForUser,
};
