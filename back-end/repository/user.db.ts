import { User } from '../model/user';
import database from '../util/database';

const getAllUsers = async (): Promise<Array<User> | null> => {
    try {
        const usersPrisma = await database.user.findMany();

        if (usersPrisma.length < 1) return null;
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (err: any) {
        console.log(err);
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
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username: { equals: username, mode: 'insensitive' } },
        });

        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getUsersByUsername = async ({
    notIDs,
    username,
}: {
    notIDs: Array<number>;
    username: string;
}): Promise<Array<User> | null> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: {
                username: { contains: username, mode: 'insensitive' },
                userID: { notIn: notIDs },
            },
        });

        if (usersPrisma.length < 1) return null;
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });

        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const createUser = async (user: User): Promise<User | null> => {
    try {
        const statsPrisma = await database.stat.findMany();
        const achievementsPrisma = await database.achievement.findMany();

        const statIDs = statsPrisma.map((statPrisma) => ({ statID: statPrisma.statID }));
        const achievementIDs = achievementsPrisma.map((achievementPrisma) => ({
            achievementID: achievementPrisma.achievementID,
        }));

        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                stats: {
                    create: statIDs,
                },
                achievements: {
                    create: achievementIDs,
                },
            },
        });
        if (!userPrisma) return null;
        return User.from(userPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const updateUser = async (user: User): Promise<User | null> => {
    try {
        const userPrisma = await database.user.update({
            where: { userID: user.getUserID() },
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
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const deleteUser = async ({ userID }: { userID: number }): Promise<Boolean> => {
    try {
        await database.user.delete({
            where: { userID: userID },
        });
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllUsers,
    getUserByID,
    getUserByUsername,
    getUsersByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
