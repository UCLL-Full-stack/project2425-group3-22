import { User } from '../model/user';
import userDb from '../repository/user.db';

const getUserByID = async (userID: number): Promise<User> => {
    const user = await userDb.getUserByID({ userID });
    if (!user) throw new Error(`User with ID ${userID} does not exist`);
    return user;
};

const getUserByEmailAndPassword = async (email: string, password: string): Promise<number> => {
    const userID = await userDb.getUserByEmailAndPassword({ email, password });
    if (!userID) throw new Error(`Password or email is incorrect`);
    return userID;
};

const createUser = async (
    username: string,
    email: string,
    password: string
): Promise<number | undefined> => {
    const emailInUse = checkEmailInUse(email);
    const userID = await userDb.createUser({ username, email, password });
    return userID;
};

const checkEmailInUse = async (email: string | undefined): Promise<boolean> => {
    if (email) {
        const user = await userDb.getUserByEmail({ email });
        return user ? false : true;
    }
    return false;
};

export default { getUserByID, getUserByEmailAndPassword, createUser };
