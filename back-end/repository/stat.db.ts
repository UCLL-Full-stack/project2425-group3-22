import { Stat } from '../model/stat';
import { UserStat } from '../model/userStat';
import database from '../util/database';

const getAllStats = async (): Promise<Array<Stat> | null> => {
    try {
        const statsPrisma = await database.stat.findMany({
            orderBy: { statID: 'asc' },
        });

        if (statsPrisma.length < 1) return null;
        return statsPrisma.map((statPrisma) => Stat.from(statPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getStatByID = async ({ statID }: { statID: number }): Promise<Stat | null> => {
    try {
        const statPrisma = await database.stat.findUnique({
            where: { statID: statID },
        });

        if (!statPrisma) return null;
        return Stat.from(statPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getStatByStatCode = async ({ statCode }: { statCode: string }): Promise<Stat | null> => {
    try {
        const statPrisma = await database.stat.findFirst({
            where: { statCode: { equals: statCode } },
        });

        if (!statPrisma) return null;
        return Stat.from(statPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getStatsByUser = async ({ userID }: { userID: number }): Promise<Array<UserStat> | null> => {
    try {
        const userStatsPrisma = await database.userStats.findMany({
            where: { userID: userID },
            include: { stat: true },
            orderBy: { statID: 'asc' },
        });

        if (userStatsPrisma.length < 1) return null;
        return userStatsPrisma.map((userStatPrisma) => UserStat.from(userStatPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserStatByUserAndCode = async ({
    userID,
    statCode,
}: {
    userID: number;
    statCode: string;
}): Promise<UserStat | null> => {
    try {
        const userStatsPrisma = await database.userStats.findMany({
            where: { AND: [{ userID: userID }, { stat: { statCode: statCode } }] },
            include: { user: true, stat: true },
        });

        if (userStatsPrisma.length < 1) return null;
        return UserStat.from(userStatsPrisma[0]);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const updateStat = async (userStat: UserStat): Promise<Boolean | null> => {
    try {
        const statPrisma = await database.userStats.updateMany({
            where: { AND: [{ userID: userStat.getUserID() }, { statID: userStat.getStatID() }] },
            data: { statValue: userStat.getStatValue() },
        });
        //TODO: remove logging
        console.log(statPrisma);

        if (!statPrisma) return false;
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllStats,
    getStatByID,
    getStatByStatCode,
    getStatsByUser,
    getUserStatByUserAndCode,
    updateStat,
};
