import { User } from '../model/user';
import userDb from '../repository/user.db';

const getUserByID = async (userID: number): Promise<User> => {
    const user = await userDb.getUserByID({ userID });
    if (!user) throw new Error(`User with id ${userID} does not exist`);
    return user;
};

const getUserByUsernameAndPassword = async (
    username: string,
    password: string
): Promise<number> => {
    const userID = await userDb.getUserByUsernameAndPassword({ username, password });
    if (!userID) throw new Error(`Password or username is incorrect`);
    return userID;
};

const getUserByEmailAndPassword = async (email: string, password: string): Promise<number> => {
    const userID = await userDb.getUserByEmailAndPassword({ email, password });
    if (!userID) throw new Error(`Password or email is incorrect`);
    return userID;
};

const createUser = async (username: string, email: string, password: string): Promise<number> => {
    if (await checkUsernameInUse(username)) throw new Error('Username is already in use');
    if (await checkEmailInUse(email)) throw new Error('Email is already in use');

    const userID = await userDb.createUser({ username, email, password });
    return userID;
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

export default { getUserByID, getUserByUsernameAndPassword, getUserByEmailAndPassword, createUser };
