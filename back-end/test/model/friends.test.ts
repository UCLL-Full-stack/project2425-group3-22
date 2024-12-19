import { Friends } from '../../model/friends';

test('given: valid values for friends, when: friends is created, then: friends is created with those values', () => {
    // given
    const friendsData = {
        user1ID: 1,
        user2ID: 2,
    };

    // when
    const friends = new Friends(friendsData);

    // then
    expect(friends.getUser1ID()).toBe(1);
    expect(friends.getUser2ID()).toBe(2);
});

test('given: invalid user1ID for friends, when: friends is created, then: error is thrown', () => {
    // given
    const friendsData = {
        user1ID: 0,
        user2ID: 2,
    };

    // when

    // then
    expect(() => new Friends(friendsData)).toThrow(
        "Both userID's are required and both must be positive and whole numbers."
    );
});

test('given: invalid user2ID for friends, when: friends is created, then: error is thrown', () => {
    // given
    const friendsData = {
        user1ID: 1,
        user2ID: -2,
    };

    // when

    // then
    expect(() => new Friends(friendsData)).toThrow(
        "Both userID's are required and both must be positive and whole numbers."
    );
});
