import { User } from '../../model/user';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given

    // when
    const user = new User({
        userID: 1,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'test-pass',
    });

    // then
    expect(user.getUserID()).toEqual(1);
    expect(user.getUsername()).toEqual('test-user');
    expect(user.getEmail()).toEqual('test-user@email.com');
    expect(user.getPassword()).toEqual('test-pass');
    expect(user.getRole()).toEqual('User');
    expect(user.getPoops()).toBeUndefined();
});

test('given: invalid username for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'tu',
        email: 'test-user@email.com',
        password: 'test-pass',
    };
    const user2 = {
        userID: 2,
        username: 'test@user',
        email: 'test-user@email.com',
        password: 'test-pass',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow('username must be between 3 and 25 characters');
    expect(() => new User(user2)).toThrow('username cannot contain an @');
});

test('given: invalid email for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'test-user',
        email: 'test-user.email.com',
        password: 'test-pass',
    };
    const user2 = {
        userID: 2,
        username: 'test-user',
        email: 'test-user@email@com',
        password: 'test-pass',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow('email must be in email format (name@domain.com)');
    expect(() => new User(user2)).toThrow('email must be in email format (name@domain.com)');
});

test('given: invalid password for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'testpass',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow('password must be longer than 8 characters');
});
