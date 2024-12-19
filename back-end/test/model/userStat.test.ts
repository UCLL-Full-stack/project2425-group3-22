import { UserStat } from '../../model/userStat';

test('given: valid values for userStat, when: userStat is created, then: userStat is created with those values', () => {
    // given
    const userStatData = {
        userID: 1,
        statID: 2,
        statValue: 1,
    };

    // when
    const userStat = new UserStat(userStatData);

    // then
    expect(userStat.getUserID()).toBe(1);
    expect(userStat.getStatID()).toBe(2);
    expect(userStat.getStatValue()).toBe(1);
});

test('given: invalid userID for userStat, when: userStat is created, then: error is thrown', () => {
    // given
    const userStatData1 = {
        userID: -1,
        statID: 2,
        statValue: 1,
    };
    const userStatData2 = {
        userID: 1.5,
        statID: 2,
        statValue: 1,
    };

    // when

    // then
    expect(() => new UserStat(userStatData1)).toThrow(
        'UserID is required and must be a positive whole number.'
    );
    expect(() => new UserStat(userStatData2)).toThrow(
        'UserID is required and must be a positive whole number.'
    );
});

test('given: invalid statID for userStat, when: userStat is created, then: error is thrown', () => {
    // given
    const userStatData1 = {
        userID: 1,
        statID: -2,
        statValue: 1,
    };
    const userStatData2 = {
        userID: 1,
        statID: 2.5,
        statValue: 1,
    };

    // when

    // then
    expect(() => new UserStat(userStatData1)).toThrow(
        'StatID is required and must be a positive whole number.'
    );
    expect(() => new UserStat(userStatData2)).toThrow(
        'StatID is required and must be a positive whole number.'
    );
});

test('given: invalid statValue for userStat, when: userStat is created, then: error is thrown', () => {
    // given
    const userStatData1 = {
        userID: 1,
        statID: 2,
        statValue: -1,
    };
    const userStatData2 = {
        userID: 1,
        statID: 2,
        statValue: 1.5,
    };

    // when

    // then
    expect(() => new UserStat(userStatData1)).toThrow(
        'Stat value is required and must be a positive whole number.'
    );
    expect(() => new UserStat(userStatData2)).toThrow(
        'Stat value is required and must be a positive whole number.'
    );
});
