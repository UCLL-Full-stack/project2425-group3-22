import { FriendRequest } from '../../model/friendRequest';

test('given: valid values for friendRequest, when: friendRequest is created, then: friendRequest is created with those values', () => {
    // given
    const friendRequestData = {
        senderID: 1,
        receiverID: 2,
    };

    // when
    const friendRequest = new FriendRequest(friendRequestData);

    // then
    expect(friendRequest.getSenderID()).toBe(1);
    expect(friendRequest.getReceiverID()).toBe(2);
});

test('given: invalid senderID for friendRequest, when: friendRequest is created, then: error is thrown', () => {
    // given
    const friendRequestData = {
        senderID: 0,
        receiverID: 2,
    };

    // when

    // then
    expect(() => new FriendRequest(friendRequestData)).toThrow(
        'SenderID is required and must be a positive and whole number.'
    );
});

test('given: invalid receiverID for friendRequest, when: friendRequest is created, then: error is thrown', () => {
    // given
    const friendRequestData = {
        senderID: 1,
        receiverID: -2,
    };

    // when

    // then
    expect(() => new FriendRequest(friendRequestData)).toThrow(
        'ReceiverID is required and must be a positive and whole number.'
    );
});
