import { UserAchievement } from '../model/userAchievement';
import achievementDB from '../repository/achievement.db';
import statDB from '../repository/stat.db';
import { AchievementResponse, UserAchievementResponse } from '../types';

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
    if (!Number.isInteger(achievementID) || achievementID <= 0)
        throw new Error('achievementID is required and must be a positive whole number.');

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
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('userID is required and must be a positive whole number.');

    await checkStats(userID);

    const userAchievements = await achievementDB.getAchievementsByUser({ userID });
    if (!userAchievements) throw new Error('No achievements found.');

    const userStats = await statDB.getStatsByUser({ userID });
    if (!userStats) throw new Error('No stats found.');

    return userAchievements.map((userAchievement) => {
        const levelsCriteria = userAchievement.getAchievement()?.getLevelsCriteria();
        if (!levelsCriteria) throw new Error('Levels criteria are not defined.');

        const nextLevel = userAchievement.getAchievedLevel() + 1;
        const inBounds = levelsCriteria.length;

        let nextLevelString = '';
        userStats.forEach((userStat) => {
            if (userStat.getStatID() === userAchievement.getAchievement()?.getStatID()) {
                const statValue = userStat.getStatValue();

                if (inBounds && nextLevel > inBounds) {
                    nextLevelString = `${statValue}/${levelsCriteria[levelsCriteria.length - 1]}`;
                } else {
                    const nextLevelCriteria = levelsCriteria[nextLevel - 1];
                    nextLevelString = `${statValue}/${nextLevelCriteria}`;
                }
            }
        });

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
    const userStats = await statDB.getStatsByUser({ userID });
    const achievements = await achievementDB.getAllAchievements();
    const userAchievements = await achievementDB.getAchievementsByUser({ userID });

    if (userStats && achievements) {
        userStats.forEach(async (userStat) => {
            achievements.forEach(async (achievement) => {
                if (userStat.getStat()?.getStatCode() === achievement.getStat()?.getStatCode()) {
                    let level = 0;
                    const levels = achievement.getLevels();
                    const levelsCriteria = achievement.getLevelsCriteria();

                    for (let i = 0; i < levelsCriteria.length; i++) {
                        if (userStat.getStatValue() >= levelsCriteria[i]) {
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
    }
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
    if (userAchievementToUpdate) {
        userAchievementToUpdate.setAchievedLevel(achievedLevel);
        await achievementDB.updateAchievementLevel(userAchievementToUpdate);
    }
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
    checkStats,
};
