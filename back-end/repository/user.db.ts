import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<Array<User> | null> => {
    try {
        const usersPrisma = await database.user.findMany();

        if (usersPrisma.length < 1) return null;
        return usersPrisma.map((userPrisma) => {
            const user = User.from(userPrisma);
            user.setPassword('');
            return user;
        });
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByID = async ({ userID }: { userID: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { userID: userID },
        });

        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username: username },
        });

        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email: email },
        });

        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const createUser = async (user: User): Promise<User | null> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllUsers,
    getUserByID,
    getUserByUsername,
    getUserByEmail,
    createUser,
};
