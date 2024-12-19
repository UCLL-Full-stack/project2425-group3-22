import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import bcrypt from 'bcrypt';

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
let mockUserDbGetUsersByUsername: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockBcryptHash: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbGetUsersByUsername = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockBcryptHash = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

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

test('given: a valid username, when: getting users by username, then: all users with username containing username are returned', async () => {
    //given
    userDb.getUsersByUsername = mockUserDbGetUsersByUsername.mockReturnValue([user2, user3]);

    //when
    const response = await userService.getUsersByUsername(1, 'user');

    //then
    expect(mockUserDbGetUsersByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUsersByUsername).toHaveBeenCalledWith({ notIDs: [1], username: 'user' });
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
