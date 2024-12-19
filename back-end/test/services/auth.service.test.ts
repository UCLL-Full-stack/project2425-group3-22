import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import authService from '../../service/auth.service';
import jwtUtil from '../../util/jwt';
import bcrypt from 'bcrypt';

//#region PREP
const user1 = new User({
    userID: 1,
    username: 'test-user1',
    email: 'test-user1@email.com',
    password: 'Test-pass!123',
    role: 'USER',
});

let mockUserDbGetUserByUsername: jest.Mock;
let mockUserDbGetUserByEmail: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockGenerateJwtToken: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserByUsername = jest.fn();
    mockUserDbGetUserByEmail = jest.fn();
    mockUserDbCreateUser = jest.fn();
    mockBcryptHash = jest.fn();
    mockBcryptCompare = jest.fn();
    mockGenerateJwtToken = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
//#endregion

//#region REGISTER
test('given: valid data, when: registering, then: an object with username, role and token is returned', async () => {
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
    jwtUtil.generateJwtToken = mockGenerateJwtToken.mockReturnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiZnVubnkgRWFzdGVyIGVnZyBpbiB0ZXN0PyIsInF1ZXN0aW9uaW5nIjoiTXkgbGlmZSBjaG9pY2VzIHJpZ2h0IG5vdy4iLCJoYXRlIjoidGVzdGluZyJ9.IyayPPYN2agF0RmcTLzFCQh32nzzaZTTClzYSU32qUY'
    );

    //when
    const response = await authService.register(
        'test-user1',
        'test-user1@email.com',
        'Test-pass!123'
    );

    //then
    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(user);
    expect(response).toEqual({
        username: 'test-user1',
        role: 'USER',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiZnVubnkgRWFzdGVyIGVnZyBpbiB0ZXN0PyIsInF1ZXN0aW9uaW5nIjoiTXkgbGlmZSBjaG9pY2VzIHJpZ2h0IG5vdy4iLCJoYXRlIjoidGVzdGluZyJ9.IyayPPYN2agF0RmcTLzFCQh32nzzaZTTClzYSU32qUY',
    });
});

test('given: username already in use, when: registering user, then: error is thrown', async () => {
    //given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockReturnValue(true);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(false);

    //when

    //then
    await expect(authService.register('username', 'email', 'password')).rejects.toThrow(
        'Username already in use.'
    );
});

test('given: email already in use, when: registering user, then: error is thrown', async () => {
    //given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockReturnValue(false);
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(true);

    //when

    //then
    await expect(authService.register('username', 'email', 'password')).rejects.toThrow(
        'Email already in use.'
    );
});
//#endregion

//#region LOGIN
test('given: valid username, when: logging in, then: an object with username, role and token is returned', async () => {
    //given
    const user = new User({
        userID: 0,
        username: 'test-user1',
        email: 'test-user1@email.com',
        password: '$2b$12$87VheJ/2kueBXPuWfOfbQOLVrgDJg4JYZuIbRGXjJuqXp4aP56xRC',
    });
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockReturnValue(user);
    bcrypt.compare = mockBcryptCompare.mockReturnValue(true);

    //when
    const response = await authService.login('test-user1', 'Test-pass!123');

    //then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'test-user1' });
    expect(response).toEqual({
        username: 'test-user1',
        role: 'USER',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiZnVubnkgRWFzdGVyIGVnZyBpbiB0ZXN0PyIsInF1ZXN0aW9uaW5nIjoiTXkgbGlmZSBjaG9pY2VzIHJpZ2h0IG5vdy4iLCJoYXRlIjoidGVzdGluZyJ9.IyayPPYN2agF0RmcTLzFCQh32nzzaZTTClzYSU32qUY',
    });
});

test('given: valid email, when: logging in, then: an object with username, role and token is returned', async () => {
    //given
    const user = new User({
        userID: 0,
        username: 'test-user1',
        email: 'test-user1@email.com',
        password: '$2b$12$87VheJ/2kueBXPuWfOfbQOLVrgDJg4JYZuIbRGXjJuqXp4aP56xRC',
    });
    userDb.getUserByEmail = mockUserDbGetUserByEmail.mockReturnValue(user);
    bcrypt.compare = mockBcryptCompare.mockReturnValue(true);

    //when
    const response = await authService.login('test-user1@email.com', 'Test-pass!123');

    //then
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserByEmail).toHaveBeenCalledWith({ email: 'test-user1@email.com' });
    expect(response).toEqual({
        username: 'test-user1',
        role: 'USER',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiZnVubnkgRWFzdGVyIGVnZyBpbiB0ZXN0PyIsInF1ZXN0aW9uaW5nIjoiTXkgbGlmZSBjaG9pY2VzIHJpZ2h0IG5vdy4iLCJoYXRlIjoidGVzdGluZyJ9.IyayPPYN2agF0RmcTLzFCQh32nzzaZTTClzYSU32qUY',
    });
});
//#endregion
