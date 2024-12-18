import { Achievement } from '../../model/achievement';

test('given: valid values for achievement, when: achievement is created, then: achievement is created with those values', () => {
    // given

    // when
    const achievement = new Achievement({
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: 'this is a test-achievement',
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    });

    // then
    expect(achievement.getAchievementID()).toEqual(1);
    expect(achievement.getAchievementCode()).toEqual('A1');
    expect(achievement.getName()).toEqual('test-achievement');
    expect(achievement.getDescription()).toEqual('this is a test-achievement');
    expect(achievement.getLevels()).toEqual([1, 2, 3]);
    expect(achievement.getLevelsCriteria()).toEqual([10, 20, 50]);
    expect(achievement.getStatID()).toEqual(1);
});

test('given: invalid username for user, when: user is created, then: error is thrown', () => {
    // given
    // when
    // then
});

test('given: invalid email for user, when: user is created, then: error is thrown', () => {
    // given
    // when
    // then
});

test('given: invalid password for user, when: user is created, then: error is thrown', () => {
    // given
    // when
    // then
});
