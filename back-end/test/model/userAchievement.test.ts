import { UserAchievement } from '../../model/userAchievement';

test('given: valid values for userAchievement, when: userAchievement is created, then: userAchievement is created with those values', () => {
    // given
    const userAchievementData = {
        userID: 1,
        achievementID: 2,
        achievedLevel: 1,
    };

    // when
    const userAchievement = new UserAchievement(userAchievementData);

    // then
    expect(userAchievement.getUserID()).toBe(1);
    expect(userAchievement.getAchievementID()).toBe(2);
    expect(userAchievement.getAchievedLevel()).toBe(1);
});

test('given: invalid userID for userAchievement, when: userAchievement is created, then: error is thrown', () => {
    // given
    const userAchievementData1 = {
        userID: -1,
        achievementID: 2,
        achievedLevel: 1,
    };
    const userAchievementData2 = {
        userID: 1.5,
        achievementID: 2,
        achievedLevel: 1,
    };

    // when

    // then
    expect(() => new UserAchievement(userAchievementData1)).toThrow(
        'UserID is required and must be a positive whole number.'
    );
    expect(() => new UserAchievement(userAchievementData2)).toThrow(
        'UserID is required and must be a positive whole number.'
    );
});

test('given: invalid achievementID for userAchievement, when: userAchievement is created, then: error is thrown', () => {
    // given
    const userAchievementData1 = {
        userID: 1,
        achievementID: -2,
        achievedLevel: 1,
    };
    const userAchievementData2 = {
        userID: 1,
        achievementID: 2.5,
        achievedLevel: 1,
    };

    // when

    // then
    expect(() => new UserAchievement(userAchievementData1)).toThrow(
        'AchievementID is required and must be a positive whole number.'
    );
    expect(() => new UserAchievement(userAchievementData2)).toThrow(
        'AchievementID is required and must be a positive whole number.'
    );
});

test('given: invalid achievedLevel for userAchievement, when: userAchievement is created, then: error is thrown', () => {
    // given
    const userAchievementData1 = {
        userID: 1,
        achievementID: 2,
        achievedLevel: -1,
    };
    const userAchievementData2 = {
        userID: 1,
        achievementID: 2,
        achievedLevel: 1.5,
    };

    // when

    // then
    expect(() => new UserAchievement(userAchievementData1)).toThrow(
        'Achieved level is required and must be a positive whole number.'
    );
    expect(() => new UserAchievement(userAchievementData2)).toThrow(
        'Achieved level is required and must be a positive whole number.'
    );
});
