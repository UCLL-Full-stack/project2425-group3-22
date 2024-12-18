import { Achievement } from '../../model/achievement';

test('given: valid values for achievement, when: achievement is created, then: achievement is created with those values', () => {
    // given
    const achievementData = {
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: { english: 'this is a test-achievement' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };

    // when
    const achievement = new Achievement(achievementData);

    // then
    expect(achievement.getAchievementID()).toBe(1);
    expect(achievement.getAchievementCode()).toBe('A1');
    expect(achievement.getName()).toBe('test-achievement');
    expect(achievement.getDescription()).toEqual({ english: 'this is a test-achievement' });
    expect(achievement.getLevels()).toEqual([1, 2, 3]);
    expect(achievement.getLevelsCriteria()).toEqual([10, 20, 50]);
    expect(achievement.getStatID()).toBe(1);
});

test('given: invalid name for achievement, when: achievement is created, then: error is thrown', () => {
    // given
    const achievement1 = {
        achievementID: 1,
        achievementCode: 'A1',
        name: '',
        description: { english: 'this is a test-achievement' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };
    const achievement2 = {
        achievementID: 2,
        achievementCode: 'A1',
        name: 'test-achievement'.repeat(10),
        description: { english: 'this is a test-achievement' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };

    // when

    // then
    expect(() => new Achievement(achievement1)).toThrow(
        'Name is required and cannot be longer than 100 characters.'
    );
    expect(() => new Achievement(achievement2)).toThrow(
        'Name is required and cannot be longer than 100 characters.'
    );
});

test('given: invalid description for achievement, when: achievement is created, then: error is thrown', () => {
    // given
    const achievement1 = {
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: null,
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };
    const achievement2 = {
        achievementID: 2,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: 'description',
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };
    const achievement3 = {
        achievementID: 3,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: {
            english: 'this is a test-achievement'.repeat(10),
        },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };
    const achievement4 = {
        achievementID: 4,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: { english: 1 },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };

    // when

    // then
    expect(() => new Achievement(achievement1)).toThrow(
        'Description is required and must be an object containing key value pairs, the key should be the language and the value the description in that language.'
    );
    expect(() => new Achievement(achievement2)).toThrow(
        'Description is required and must be an object containing key value pairs, the key should be the language and the value the description in that language.'
    );
    expect(() => new Achievement(achievement3)).toThrow(
        'Each description must be a string and cannot be longer than 255 characters.'
    );
    expect(() => new Achievement(achievement4)).toThrow(
        'Each description must be a string and cannot be longer than 255 characters.'
    );
});

test('given: invalid levels for achievement, when: achievement is created, then: error is thrown', () => {
    // given
    const achievement = {
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: { english: 'this is a test-achievement' },
        levels: [],
        levelsCriteria: [10, 20, 50],
        statID: 1,
    };

    // when

    // then
    expect(() => new Achievement(achievement)).toThrow(
        'Levels is required and must be an array of maximum 10 positive and whole numbers.'
    );
});

test('given: invalid levelsCriteria for achievement, when: achievement is created, then: error is thrown', () => {
    // given
    const achievement = {
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: { english: 'this is a test-achievement' },
        levels: [1, 2, 3],
        levelsCriteria: [],
        statID: 1,
    };

    // when

    // then
    expect(() => new Achievement(achievement)).toThrow(
        'Levels criteria is required and must be an array the same lenght as levels, containing only positive and whole numbers.'
    );
});

test('given: invalid statID for achievement, when: achievement is created, then: error is thrown', () => {
    // given
    const achievement = {
        achievementID: 1,
        achievementCode: 'A1',
        name: 'test-achievement',
        description: { english: 'this is a test-achievement' },
        levels: [1, 2, 3],
        levelsCriteria: [10, 20, 50],
        statID: 0,
    };

    // when

    // then
    expect(() => new Achievement(achievement)).toThrow(
        'StatID is required and must be a positive and whole number.'
    );
});
