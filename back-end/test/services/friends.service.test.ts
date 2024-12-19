import { FriendRequest } from '../../model/friendRequest';
import { Friends } from '../../model/friends';
import { User } from '../../model/user';
import friendsDb from '../../repository/friends.db';
import friendsService from '../../service/friends.service';

//#region PREP
const user1 = new User({
    userID: 1,
    username: 'test-user1',
    email: 'test-user1@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});
const user2 = new User({
    userID: 2,
    username: 'test-user2',
    email: 'test-user2@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});
const user3 = new User({
    userID: 3,
    username: 'test-user3',
    email: 'test-user3@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});
const user4 = new User({
    userID: 4,
    username: 'test-user4',
    email: 'test-user4@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});
const user5 = new User({
    userID: 5,
    username: 'test-user5',
    email: 'test-user5@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});

const friends1 = new Friends({
    user1ID: 1,
    user2ID: 2,
    user1: user1,
    user2: user2,
});
const friends2 = new Friends({
    user1ID: 1,
    user2ID: 3,
    user1: user1,
    user2: user3,
});

const friendRequest1 = new FriendRequest({
    senderID: 4,
    receiverID: 1,
    sender: user4,
    receiver: user2,
});
const friendRequest2 = new FriendRequest({
    senderID: 1,
    receiverID: 5,
    sender: user1,
    receiver: user5,
});

let mockFriendsDbGetAllFriendsByUser: jest.Mock;
let mockFriendsDbGetAllIncomingFriendRequestsByUser: jest.Mock;
let mockFriendsDbGetAllOutgoingFriendRequestsByUser: jest.Mock;
let mockFriendsDbGetFriendRequest: jest.Mock;
let mockFriendsDbGetFriendByUser: jest.Mock;
let mockFriendsDbSendFriendRequest: jest.Mock;
let mockFriendsDbCancelFriendRequest: jest.Mock;
let mockFriendsDbAcceptFriendRequest: jest.Mock;
let mockFriendsDbRefuseFriendRequest: jest.Mock;
let mockFriendsDbRemoveFriend: jest.Mock;

beforeEach(() => {
    mockFriendsDbGetAllFriendsByUser = jest.fn();
    mockFriendsDbGetAllIncomingFriendRequestsByUser = jest.fn();
    mockFriendsDbGetAllOutgoingFriendRequestsByUser = jest.fn();
    mockFriendsDbGetFriendRequest = jest.fn();
    mockFriendsDbGetFriendByUser = jest.fn();
    mockFriendsDbSendFriendRequest = jest.fn();
    mockFriendsDbCancelFriendRequest = jest.fn();
    mockFriendsDbAcceptFriendRequest = jest.fn();
    mockFriendsDbRefuseFriendRequest = jest.fn();
    mockFriendsDbRemoveFriend = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region GET FRIENDS INFO
test('given: at least one friends or friendRequest exists for given user, when: getting all friends info, then: all friends info is returned', async () => {
    //given
    friendsDb.getAllFriendsByUser = mockFriendsDbGetAllFriendsByUser.mockReturnValue([
        friends1,
        friends2,
    ]);
    friendsDb.getAllIncomingFriendRequestsByUser =
        mockFriendsDbGetAllIncomingFriendRequestsByUser.mockReturnValue([friendRequest1]);
    friendsDb.getAllOutgoingFriendRequestsByUser =
        mockFriendsDbGetAllOutgoingFriendRequestsByUser.mockReturnValue([friendRequest2]);

    //when
    const response = await friendsService.getFriendsInfoByUser(1);

    //then
    expect(mockFriendsDbGetAllFriendsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllIncomingFriendRequestsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllOutgoingFriendRequestsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllFriendsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(mockFriendsDbGetAllIncomingFriendRequestsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(mockFriendsDbGetAllOutgoingFriendRequestsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(response).toEqual({
        friends: [
            { userID: 2, username: 'test-user2' },
            { userID: 3, username: 'test-user3' },
        ],
        incoming: [{ userID: 4, username: 'test-user4' }],
        outgoing: [{ userID: 5, username: 'test-user5' }],
    });
});

test('given: at no friends or friendRequest exist for given user, when: getting all friends info, then: all empty arrays are returned', async () => {
    //given
    friendsDb.getAllFriendsByUser = mockFriendsDbGetAllFriendsByUser.mockReturnValue(null);
    friendsDb.getAllIncomingFriendRequestsByUser =
        mockFriendsDbGetAllIncomingFriendRequestsByUser.mockReturnValue(null);
    friendsDb.getAllOutgoingFriendRequestsByUser =
        mockFriendsDbGetAllOutgoingFriendRequestsByUser.mockReturnValue(null);

    //when
    const response = await friendsService.getFriendsInfoByUser(1);

    //then
    expect(mockFriendsDbGetAllFriendsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllIncomingFriendRequestsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllOutgoingFriendRequestsByUser).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbGetAllFriendsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(mockFriendsDbGetAllIncomingFriendRequestsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(mockFriendsDbGetAllOutgoingFriendRequestsByUser).toHaveBeenCalledWith({ userID: 1 });
    expect(response).toEqual({
        friends: [],
        incoming: [],
        outgoing: [],
    });
});
//#endregion

//#region SEND FRIENDREQUEST
test('given: valid senderID and receiverID, when: sending a friendRequest, then: friendRequest is send and receiver returned', async () => {
    //given
    const friendRequest = new FriendRequest({
        senderID: 1,
        receiverID: 5,
    });
    friendsDb.sendFriendRequest = mockFriendsDbSendFriendRequest.mockReturnValue(friendRequest2);

    //when
    const response = await friendsService.sendFriendRequest(1, 5);

    //then
    expect(mockFriendsDbSendFriendRequest).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbSendFriendRequest).toHaveBeenCalledWith(friendRequest);
    expect(response).toEqual({
        userID: 5,
        username: 'test-user5',
    });
});

test('given: an invalid senderID, when: sending a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.sendFriendRequest(-1, 5)).rejects.toThrow(
        'SenderID is required and must be a positive and whole number.'
    );
    await expect(friendsService.sendFriendRequest(1.5, 5)).rejects.toThrow(
        'SenderID is required and must be a positive and whole number.'
    );
});

test('given: an invalid receiverID, when: sending a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.sendFriendRequest(1, -5)).rejects.toThrow(
        'ReceiverID is required and must be a positive and whole number.'
    );
    await expect(friendsService.sendFriendRequest(1, 5.5)).rejects.toThrow(
        'ReceiverID is required and must be a positive and whole number.'
    );
});
//#endregion

//#region CANCEL FRIENDREQUEST
test('given: valid senderID and receiverID, when: cancelling a friendRequest, then: friendRequest is cancelled and message returned', async () => {
    //given
    friendsDb.getFriendRequest = mockFriendsDbGetFriendRequest.mockReturnValue(friendRequest2);
    friendsDb.cancelFriendRequest = mockFriendsDbCancelFriendRequest.mockReturnValue(true);

    //when
    const response = await friendsService.cancelFriendRequest(1, 5);

    //then
    expect(mockFriendsDbCancelFriendRequest).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbCancelFriendRequest).toHaveBeenCalledWith(friendRequest2);
    expect(response).toEqual('Friendrequest successfully cancelled.');
});

test('given: an invalid senderID, when: cancelling a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.cancelFriendRequest(-1, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
    await expect(friendsService.cancelFriendRequest(1.5, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
});

test('given: an invalid receiverID, when: cancelling a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.cancelFriendRequest(1, -5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
    await expect(friendsService.cancelFriendRequest(1, 5.5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
});
//#endregion

//#region ACCEPT FRIENDREQUEST
test('given: valid senderID and receiverID, when: accepting a friendRequest, then: friendRequest is accepted and sender returned', async () => {
    //given
    friendsDb.getFriendRequest = mockFriendsDbGetFriendRequest.mockReturnValue(friendRequest1);
    friendsDb.acceptFriendRequest = mockFriendsDbAcceptFriendRequest.mockReturnValue(
        new Friends({ user1ID: 4, user2ID: 1, user1: user4, user2: user1 })
    );

    //when
    const response = await friendsService.acceptFriendRequest(4, 1);

    //then
    expect(mockFriendsDbAcceptFriendRequest).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbAcceptFriendRequest).toHaveBeenCalledWith(friendRequest1);
    expect(response).toEqual({
        userID: 4,
        username: 'test-user4',
    });
});

test('given: an invalid senderID, when: accepting a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.acceptFriendRequest(-1, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
    await expect(friendsService.acceptFriendRequest(1.5, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
});

test('given: an invalid receiverID, when: accepting a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.acceptFriendRequest(1, -5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
    await expect(friendsService.acceptFriendRequest(1, 5.5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
});
//#endregion

//#region REFUSE FRIENDREQUEST
test('given: valid senderID and receiverID, when: refusing a friendRequest, then: friendRequest is refused and message returned', async () => {
    //given
    friendsDb.getFriendRequest = mockFriendsDbGetFriendRequest.mockReturnValue(friendRequest1);
    friendsDb.refuseFriendRequest = mockFriendsDbRefuseFriendRequest.mockReturnValue(true);

    //when
    const response = await friendsService.refuseFriendRequest(4, 1);

    //then
    expect(mockFriendsDbRefuseFriendRequest).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbRefuseFriendRequest).toHaveBeenCalledWith(friendRequest1);
    expect(response).toEqual('Friendrequest successfully refused.');
});

test('given: an invalid senderID, when: refusing a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.refuseFriendRequest(-1, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
    await expect(friendsService.refuseFriendRequest(1.5, 5)).rejects.toThrow(
        'SenderID is required and must be a positive whole number.'
    );
});

test('given: an invalid receiverID, when: refusing a friendRequest, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.refuseFriendRequest(1, -5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
    await expect(friendsService.refuseFriendRequest(1, 5.5)).rejects.toThrow(
        'ReceiverID is required and must be a positive whole number.'
    );
});
//#endregion

//#region REMOVE FRIEND
test('given: valid userID and friendID, when: removing a friend, then: friend is removed and returned', async () => {
    //given
    const friends = new Friends({ user1ID: 4, user2ID: 1, user1: user4, user2: user1 });
    friendsDb.getFriendByUser = mockFriendsDbGetFriendByUser.mockReturnValue(friends);
    friendsDb.removeFriend = mockFriendsDbRemoveFriend.mockReturnValue(friends);

    //when
    const response = await friendsService.removeFriend(1, 4);

    //then
    expect(mockFriendsDbRemoveFriend).toHaveBeenCalledTimes(1);
    expect(mockFriendsDbRemoveFriend).toHaveBeenCalledWith(friends);
    expect(response).toEqual({
        userID: 4,
        username: 'test-user4',
    });
});

test('given: an invalid userID, when: removing a friend, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.removeFriend(-1, 5)).rejects.toThrow(
        'UserID is required and must be a positive whole number.'
    );
    await expect(friendsService.removeFriend(1.5, 5)).rejects.toThrow(
        'UserID is required and must be a positive whole number.'
    );
});

test('given: an invalid friendID, when: removing a friend, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(friendsService.removeFriend(1, -5)).rejects.toThrow(
        'FriendID is required and must be a positive whole number.'
    );
    await expect(friendsService.removeFriend(1, 5.5)).rejects.toThrow(
        'FriendID is required and must be a positive whole number.'
    );
});
//#endregion
