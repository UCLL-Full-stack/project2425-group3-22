import { Role } from '@prisma/client';
import { User } from '../model/user';
import database from './database';

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

const createUser = async ({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: username,
                email: email,
                password: password,
                role: Role.USER,
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
    getUserByID,
    getUserByUsername,
    getUserByEmail,
    createUser,
};
