import { Stat } from '../../model/stat';

test('given: valid values for stat, when: stat is created, then: stat is created with those values', () => {
    // given
    const statData = {
        statID: 1,
        statCode: 'S1',
        name: 'test-stat',
        description: 'this is a test-stat',
    };

    // when
    const stat = new Stat(statData);

    // then
    expect(stat.getStatID()).toBe(1);
    expect(stat.getStatCode()).toBe('S1');
    expect(stat.getName()).toBe('test-stat');
    expect(stat.getDescription()).toBe('this is a test-stat');
});

test('given: invalid name for stat, when: stat is created, then: error is thrown', () => {
    // given
    const statData = {
        statID: 1,
        statCode: 'S1',
        name: 'test-stat'.repeat(15),
        description: 'this is a test-stat',
    };

    // when

    // then
    expect(() => new Stat(statData)).toThrow(
        'Name is required and cannot be longer than 100 characters.'
    );
});

test('given: invalid description for stat, when: stat is created, then: error is thrown', () => {
    // given
    const statData = {
        statID: 1,
        statCode: 'S1',
        name: 'test-stat',
        description: 'this is a test-stat'.repeat(25),
    };
    // when

    // then
    expect(() => new Stat(statData)).toThrow(
        'Description is required and cannot be longer than 255 characters.'
    );
});
