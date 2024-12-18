import { Achievement } from '../model/achievement';
import { UserAchievement } from '../model/userAchievement';
import achievementDB from '../repository/achievement.db';
import statDB from '../repository/stat.db';
import { AchievementResponse, StatResponse, UserAchievementResponse } from '../types';

const getAllAchievements = async (): Promise<Array<AchievementResponse>> => {
    const achievements = await achievementDB.getAllAchievements();
    if (!achievements) return [];

    return achievements.map(
        (achievement) =>
            <AchievementResponse>{
                achievementID: achievement.getAchievementID(),
                achievementCode: achievement.getAchievementCode(),
                name: achievement.getName(),
                description: achievement.getDescription(),
                levels: achievement.getLevels(),
                levelsCriteria: achievement.getLevelsCriteria(),
                statID: achievement.getStatID(),
            }
    );
};

const getAchievementByID = async (achievementID: number): Promise<AchievementResponse> => {
    const achievement = await achievementDB.getAchievementByID({ achievementID });
    if (!achievement) throw new Error('Achievement not found.');

    return <AchievementResponse>{
        achievementID: achievement.getAchievementID(),
        achievementCode: achievement.getAchievementCode(),
        name: achievement.getName(),
        description: achievement.getDescription(),
        levels: achievement.getLevels(),
        levelsCriteria: achievement.getLevelsCriteria(),
        statID: achievement.getStatID(),
    };
};

const getAchievementByAchievementCode = async (
    achievementCode: string
): Promise<AchievementResponse> => {
    const achievement = await achievementDB.getAchievementByAchievementCode({ achievementCode });
    if (!achievement) throw new Error('Achievement not found.');

    return <AchievementResponse>{
        achievementID: achievement.getAchievementID(),
        achievementCode: achievement.getAchievementCode(),
        name: achievement.getName(),
        description: achievement.getDescription(),
        levels: achievement.getLevels(),
        levelsCriteria: achievement.getLevelsCriteria(),
        statID: achievement.getStatID(),
    };
};

const getAchievementsByUser = async (userID: number): Promise<Array<UserAchievementResponse>> => {
    await checkStats(userID);

    const userAchievements = await achievementDB.getAchievementsByUser({ userID });
    if (!userAchievements) throw new Error('No achievements found.');

    const userStats = await statDB.getStatsByUser({ userID });
    if (!userStats) throw new Error('No stats found.');

    return userAchievements.map((userAchievement) => {
        const nextLevel = userAchievement.getAchievedLevel();
        const inBounds = userAchievement.getAchievement()?.getLevelsCriteria().length;

        let nextLevelString = '';
        if (inBounds && nextLevel > inBounds - 1) {
            nextLevelString = 'max';
        } else {
            const nextLevelCriteria = userAchievement.getAchievement()?.getLevelsCriteria()[
                nextLevel
            ];

            let statValue = 0;
            userStats.forEach((userStat) => {
                if (userStat.getStatID() === userAchievement.getAchievement()?.getStatID()) {
                    statValue = userStat.getStatValue();
                }
            });
            nextLevelString = `${statValue}/${nextLevelCriteria}`;
        }

        return <UserAchievementResponse>{
            achievementID: userAchievement.getAchievementID(),
            achievementCode: userAchievement.getAchievement()?.getAchievementCode(),
            name: userAchievement.getAchievement()?.getName(),
            description: userAchievement.getAchievement()?.getDescription(),
            achievedLevel: userAchievement.getAchievedLevel(),
            achievedAt: userAchievement.getAchievedAt(),
            nextLevel: nextLevelString,
        };
    });
};

const checkStats = async (userID: number): Promise<void> => {
    const stats = await statDB.getStatsByUser({ userID });
    const achievements = await achievementDB.getAllAchievements();
    const userAchievements = await achievementDB.getAchievementsByUser({ userID });

    if (!stats || !achievements) throw new Error('Error occured checking stats.');

    stats.forEach(async (stat) => {
        achievements.forEach(async (achievement) => {
            if (stat.getStat()?.getStatCode() === achievement.getStat()?.getStatCode()) {
                let level = 0;
                const levelsCriteria = achievement.getLevelsCriteria();
                const levels = achievement.getLevels();

                for (let i = 0; i < levelsCriteria.length; i++) {
                    if (stat.getStatValue() > levelsCriteria[i - 1]) {
                        level = levels[i];
                    }
                }

                if (level > 0) {
                    const userAchievement = userAchievements?.find(
                        (ua) =>
                            achievement.getAchievementCode() ===
                            ua.getAchievement()?.getAchievementCode()
                    );
                    if (userAchievement) {
                        if (userAchievement.getAchievedLevel() < level)
                            await updateAchievementLevel(
                                userID,
                                achievement.getAchievementCode(),
                                level
                            );
                    } else {
                        await giveAchievement(userID, achievement.getAchievementID(), level);
                    }
                }
            }
        });
    });
};

const updateAchievementLevel = async (
    userID: number,
    achievementCode: string,
    achievedLevel: number
): Promise<void> => {
    const userAchievementToUpdate = await achievementDB.getUserAchievementByUserAndCode({
        userID,
        achievementCode,
    });
    if (!userAchievementToUpdate) throw new Error('Achievement not found.');

    userAchievementToUpdate.setAchievedLevel(achievedLevel);

    const updatedAchievement = await achievementDB.updateAchievementLevel(userAchievementToUpdate);
    if (!updatedAchievement) throw new Error('Error occured updating achievement.');
};

const giveAchievement = async (
    userID: number,
    achievementID: number,
    achievedLevel: number
): Promise<void> => {
    const userAchievementToCreate = new UserAchievement({
        userID,
        achievementID,
        achievedLevel,
    });

    const createdUserAchievement = await achievementDB.giveAchievement(userAchievementToCreate);
    if (!createdUserAchievement) throw new Error('Error occured giving achievement.');
};

export default {
    getAllAchievements,
    getAchievementByID,
    getAchievementByAchievementCode,
    getAchievementsByUser,
};
