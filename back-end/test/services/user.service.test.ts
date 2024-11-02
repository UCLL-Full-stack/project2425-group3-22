import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { RegisterInput, LoginInput } from '../../types';

const user = new User({
    userID: 1,
    username: 'test-user',
    email: 'test-user@email.com',
    password: 'test-pass',
});

const registerInput: RegisterInput = {
    username: '',
    email: '',
    password: '',
};

const loginInput: LoginInput = {
    usernameOrEmail: '',
    password: '',
};

let getUserByIdMock: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    getUserByIdMock = jest.fn();

    mockUserDbGetUserById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a valid userID, when: getting user by id, then: user with given id is returned', () => {
    //given
    userDb.getUserByID = mockUserDbGetUserById.mockReturnValue(user);

    //when
    userService.getUserByID = getUserByIdMock(1);

    //then
    expect(getUserByIdMock).toHaveBeenCalledTimes(1);
    expect(getUserByIdMock).toHaveBeenCalledWith(1);
});

//TODO: fix test
test('given: an invalid userID, when: getting user by id, then: an error is thrown', () => {
    //given
    userDb.getUserByID = mockUserDbGetUserById.mockReturnValue(null);

    //when
    userService.getUserByID = getUserByIdMock(1);

    //then
    expect(getUserByIdMock).toThrow('User with id 1 does not exist');
});
