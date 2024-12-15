import { Achievement } from '../model/achievement';
import { UserAchievement } from '../model/userAchievement';
import achievementDB from '../repository/achievement.db';
import { UserAchievementResponse } from '../types';

const getAllAchievements = async (): Promise<Array<Achievement>> => {
    const achievements = await achievementDB.getAllAchievements();
    if (!achievements) return [];
    return achievements;
};

const getAchievementByID = async (achievementID: number): Promise<Achievement> => {
    const achievement = await achievementDB.getAchievementByID({ achievementID });
    if (!achievement) throw new Error('Achievement not found.');

    return achievement;
};

const getAchievementByAchievementCode = async (achievementCode: string): Promise<Achievement> => {
    const achievement = await achievementDB.getAchievementByAchievementCode({ achievementCode });
    if (!achievement) throw new Error('Achievement not found.');

    return achievement;
};

const getAchievementsByUser = async (userID: number): Promise<Array<UserAchievementResponse>> => {
    const userAchievements = await achievementDB.getAchievementsByUser({ userID });
    if (!userAchievements) throw new Error('No achievements found.');

    return userAchievements.map(
        (userAchievement) =>
            <UserAchievementResponse>{
                achievementID: userAchievement.getAchievementID(),
                achievementCode: userAchievement.getAchievement()?.getAchievementCode(),
                name: userAchievement.getAchievement()?.getName(),
                description: userAchievement.getAchievement()?.getDescription(),
                achievedLevel: userAchievement.getAchievedLevel(),
                achievedAt: userAchievement.getAchievedAt(),
            }
    );
};

const updateStat = async (userID: number, achievementCode: string): Promise<void> => {
    const userAchievementToUpdate = await achievementDB.getUserAchievementByUserAndCode({
        userID,
        achievementCode,
    });
    if (!userAchievementToUpdate) throw new Error('Achievement not found.');

    const currentAchievedLevel = userAchievementToUpdate.getAchievedLevel();
    userAchievementToUpdate.setAchievedLevel(currentAchievedLevel + 1);

    const updatedAchievement = await achievementDB.updateAchievement(userAchievementToUpdate);
    if (!updatedAchievement) throw new Error('Error occured updating achievement.');
};

export default {
    getAllAchievements,
    getAchievementByID,
    getAchievementByAchievementCode,
    getAchievementsByUser,
    updateStat,
};
