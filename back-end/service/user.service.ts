import { User } from '../model/user';
import userDb from '../repository/user.db';

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) throw new Error(`User with email ${email} does not exist`);
    return user;
};

const getUserByEmailAndPassword = async (email: string, password: string): Promise<User> => {
    const user = await userDb.getUserByEmailAndPassword({ email, password });
    if (!user) throw new Error(`Password or email is incorrect`);
    return user;
};

export default { getUserByEmail, getUserByEmailAndPassword };
