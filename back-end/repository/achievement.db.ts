import { Achievement } from '../model/achievement';
import { UserAchievement } from '../model/userAchievement';
import database from '../util/database';

const getAllAchievements = async (): Promise<Array<Achievement> | null> => {
    try {
        const achievementsPrisma = await database.achievement.findMany();

        if (achievementsPrisma.length < 1) return null;
        return achievementsPrisma.map((achievementPrisma) => Achievement.from(achievementPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getAchievementByID = async ({
    achievementID,
}: {
    achievementID: number;
}): Promise<Achievement | null> => {
    try {
        const achievementPrisma = await database.achievement.findUnique({
            where: { achievementID: achievementID },
        });

        if (!achievementPrisma) return null;
        return Achievement.from(achievementPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getAchievementByAchievementCode = async ({
    achievementCode,
}: {
    achievementCode: string;
}): Promise<Achievement | null> => {
    try {
        const achievementPrisma = await database.achievement.findFirst({
            where: { achievementCode: { equals: achievementCode } },
        });

        if (!achievementPrisma) return null;
        return Achievement.from(achievementPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getAchievementsByUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<UserAchievement> | null> => {
    try {
        const userAchievementsPrisma = await database.userAchievements.findMany({
            where: { userID: userID },
            include: { achievement: true },
        });

        if (userAchievementsPrisma.length < 1) return null;
        return userAchievementsPrisma.map((userAchievementPrisma) =>
            UserAchievement.from(userAchievementPrisma)
        );
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserAchievementByUserAndCode = async ({
    userID,
    achievementCode,
}: {
    userID: number;
    achievementCode: string;
}): Promise<UserAchievement | null> => {
    try {
        const userAchievementPrisma = await database.userAchievements.findMany({
            where: {
                AND: [{ userID: userID }, { achievement: { achievementCode: achievementCode } }],
            },
            include: { user: true, achievement: true },
        });

        if (userAchievementPrisma.length < 1) return null;
        return UserAchievement.from(userAchievementPrisma[0]);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const updateAchievement = async (userAchievement: UserAchievement): Promise<Boolean | null> => {
    try {
        const achievementPrisma = await database.userAchievements.updateMany({
            where: {
                AND: [
                    { userID: userAchievement.getUserID() },
                    { achievementID: userAchievement.getAchievementID() },
                ],
            },
            data: { achievedLevel: userAchievement.getAchievedLevel() },
        });
        //TODO: remove logging
        console.log(achievementPrisma);

        if (!achievementPrisma) return false;
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllAchievements,
    getAchievementByID,
    getAchievementByAchievementCode,
    getAchievementsByUser,
    getUserAchievementByUserAndCode,
    updateAchievement,
};
