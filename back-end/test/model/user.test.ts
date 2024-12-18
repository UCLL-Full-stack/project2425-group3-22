import { User } from '../../model/user';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given

    // when
    const user = new User({
        userID: 1,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'Test-pass!123',
    });

    // then
    expect(user.getUserID()).toEqual(1);
    expect(user.getUsername()).toEqual('test-user');
    expect(user.getEmail()).toEqual('test-user@email.com');
    expect(user.getPassword()).toEqual('Test-pass!123');
    expect(user.getRole()).toEqual('USER');
});

test('given: invalid username for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'test@user',
        email: 'test-user@email.com',
        password: 'Test-pass!123',
    };
    const user2 = {
        userID: 2,
        username: 'tu',
        email: 'test-user@email.com',
        password: 'Test-pass!123',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow('Username cannot contain an @.');
    expect(() => new User(user2)).toThrow('Username must be between 3 and 25 characters.');
});

test('given: invalid email for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'test-user',
        email: 'test-user.email.com',
        password: 'Test-pass!123',
    };
    const user2 = {
        userID: 2,
        username: 'test-user',
        email: 'test-user@email@com',
        password: 'Test-pass!123',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow('Email must be in correct format (name@domain.com).');
    expect(() => new User(user2)).toThrow('Email must be in correct format (name@domain.com).');
});

test('given: invalid password for user, when: user is created, then: error is thrown', () => {
    // given
    const user1 = {
        userID: 1,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'Test-pa',
    };
    const user2 = {
        userID: 2,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'test-pass!123',
    };
    const user3 = {
        userID: 3,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'Testpass123',
    };
    const user4 = {
        userID: 4,
        username: 'test-user',
        email: 'test-user@email.com',
        password: 'Test-pass!',
    };

    // when

    // then
    expect(() => new User(user1)).toThrow(
        'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
    );
    expect(() => new User(user2)).toThrow(
        'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
    );
    expect(() => new User(user3)).toThrow(
        'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
    );
    expect(() => new User(user4)).toThrow(
        'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
    );
});
