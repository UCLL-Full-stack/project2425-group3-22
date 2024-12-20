import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import bcrypt from 'bcrypt';

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

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbGetUsersByUsername: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockBcryptHash: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbGetUsersByUsername = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockBcryptHash = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region GET ALL
test('given: at least one user exists, when: getting all users, then: all users are returned', async () => {
    //given
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue([user1, user2, user3]);

    //when
    const response = await userService.getAllUsers();

    //then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(3);
    expect(response).toEqual([
        {
            userID: 1,
            username: 'test-user1',
            email: 'test-user1@email.com',
            role: 'USER',
        },
        {
            userID: 2,
            username: 'test-user2',
            email: 'test-user2@email.com',
            role: 'USER',
        },
        {
            userID: 3,
            username: 'test-user3',
            email: 'test-user3@email.com',
            role: 'USER',
        },
    ]);
});

test('given: no users exist, when: getting all users, then: empty array is returned', async () => {
    //given
    userDb.getAllUsers = mockUserDbGetAllUsers.mockReturnValue(null);

    //when
    const response = await userService.getAllUsers();

    //then
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
    expect(response.length).toBe(0);
    expect(response).toEqual([]);
});
//#endregion

//#region GET BY ID
test('given: a valid userID, when: getting user by id, then: user with given id is returned', async () => {
    //given
    userDb.getUserByID = mockUserDbGetUserById.mockReturnValue(user1);

    //when
    const response = await userService.getUserByID(1);

    //then
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ userID: 1 });
    expect(response).toEqual({
        userID: 1,
        username: 'test-user1',
        email: 'test-user1@email.com',
        role: 'USER',
        friends: 0,
        friendRequests: 0,
    });
});

test('given: an invalid userID, when: getting user by id, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(userService.getUserByID(-1)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
    await expect(userService.getUserByID(1.5)).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
});
//#endregion

//#region GET BY USERNAME
test('given: a valid username, when: getting users by username, then: all users with username containing username are returned', async () => {
    //given
    userDb.getUsersByUsername = mockUserDbGetUsersByUsername.mockReturnValue([user2, user3]);

    //when
    const response = await userService.getUsersByUsername(1, 'user');

    //then
    expect(mockUserDbGetUsersByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUsersByUsername).toHaveBeenCalledWith({ notIDs: [1, 2], username: 'user' });
    expect(response.length).toBe(2);
    expect(response).toEqual([
        {
            userID: 2,
            username: 'test-user2',
        },
        {
            userID: 3,
            username: 'test-user3',
        },
    ]);
});

test('given: an invalid userID or username, when: getting users by username, then: error is thrown', async () => {
    //given

    //when

    //then
    await expect(userService.getUsersByUsername(-1, 'abc')).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );
    await expect(userService.getUsersByUsername(1.5, 'abc')).rejects.toThrow(
        'userID is required and must be a positive whole number.'
    );

    await expect(userService.getUsersByUsername(1, 'ab')).rejects.toThrow(
        'username is required and must be at least 3 characters.'
    );
});
//#endregion

//#region CREATE
test('given: valid data, when: creating user, then: user is created with given data', async () => {
    //given
    const user = new User({
        userID: 0,
        username: 'test-user1',
        email: 'test-user1@email.com',
        password: '$2b$12$87VheJ/2kueBXPuWfOfbQOLVrgDJg4JYZuIbRGXjJuqXp4aP56xRC',
    });
    userDb.createUser = mockUserDbCreateUser.mockReturnValue(user1);
    bcrypt.hash = mockBcryptHash.mockReturnValue(
        '$2b$12$87VheJ/2kueBXPuWfOfbQOLVrgDJg4JYZuIbRGXjJuqXp4aP56xRC'
    );

    //when
    const response = await userService.createUser(
        'test-user1',
        'test-user1@email.com',
        'Test-pass!123'
    );

    //then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(user);
    expect(response).toEqual({
        userID: 1,
        username: 'test-user1',
        email: 'test-user1@email.com',
        role: 'USER',
    });
});

test('given: username already in use, when: creating user, then: error is thrown', async () => {
    //given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockReturnValue(true);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(false);

    //when

    //then
    await expect(userService.createUser('username', 'email', 'password')).rejects.toThrow(
        'Username already in use.'
    );
});

test('given: email already in use, when: creating user, then: error is thrown', async () => {
    //given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockReturnValue(false);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(true);

    //when

    //then
    await expect(userService.createUser('username', 'email', 'password')).rejects.toThrow(
        'Email already in use.'
    );
});
//#endregion
