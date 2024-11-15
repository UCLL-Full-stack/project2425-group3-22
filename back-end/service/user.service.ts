import { User } from '../model/user';
import userDb from '../repository/user.db';
import { hashPassword, validatePassword } from '../util/hash';

const getAllUsers = async (): Promise<Array<User>> => {
    const users = await userDb.getAllUsers();
    if (!users) throw new Error('No users found.');
    return users;
};

const getUserByID = async (userID: number): Promise<User> => {
    const user = await userDb.getUserByID({ userID });
    if (!user) throw new Error('User not found.');
    return user;
};

const getUserByUsernameAndPassword = async (username: string, password: string): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) throw new Error('User not found.');
    const valid = await validatePassword(password, user.getPassword());
    if (!valid) throw new Error('Username or password incorrect.');
    user.setPassword('');
    return user;
};

const getUserByEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) throw new Error('User not found.');
    const valid = await validatePassword(password, user.getPassword());
    if (!valid) throw new Error('Email or password incorrect.');
    user.setPassword('');
    return user;
};

const createUser = async (username: string, email: string, password: string): Promise<User> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const hashedPassword = await hashPassword(password);
    const user = await userDb.createUser(
        new User({ userID: 0, username, email, password: hashedPassword })
    );
    if (!user) throw new Error('Error occured creating user.');
    user.setPassword('');
    return user;
};

const checkEmailInUse = async (email: string | undefined): Promise<boolean> => {
    if (email) {
        const user = await userDb.getUserByEmail({ email });
        return user ? true : false;
    }
    return false;
};

const checkUsernameInUse = async (username: string | undefined): Promise<boolean> => {
    if (username) {
        const user = await userDb.getUserByUsername({ username });
        return user ? true : false;
    }
    return false;
};

export default {
    getAllUsers,
    getUserByID,
    getUserByUsernameAndPassword,
    getUserByEmailAndPassword,
    createUser,
};
