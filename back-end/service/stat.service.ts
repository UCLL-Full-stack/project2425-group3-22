import { Stat } from '../model/stat';
import { UserStat } from '../model/userStat';
import statDB from '../repository/stat.db';
import { StatUpdate, UserStatResponse } from '../types';

const getAllStats = async (): Promise<Array<Stat>> => {
    const stats = await statDB.getAllStats();
    if (!stats) return [];
    return stats;
};

const getStatByID = async (statID: number): Promise<Stat> => {
    const stat = await statDB.getStatByID({ statID });
    if (!stat) throw new Error('Stat not found.');

    return stat;
};

const getStatByStatCode = async (statCode: string): Promise<Stat> => {
    const stat = await statDB.getStatByStatCode({ statCode });
    if (!stat) throw new Error('Stat not found.');

    return stat;
};

const getStatsByUser = async (userID: number): Promise<Array<UserStatResponse>> => {
    const userStats = await statDB.getStatsByUser({ userID });
    if (!userStats) throw new Error('No stats found.');

    return userStats.map(
        (userStat) =>
            <UserStatResponse>{
                statID: userStat.getStatID(),
                statCode: userStat.getStat()?.getStatCode(),
                name: userStat.getStat()?.getName(),
                description: userStat.getStat()?.getDescription(),
                statValue: userStat.getStatValue(),
                updatedAt: userStat.getUpdatedAt(),
            }
    );
};

const updateStat = async (
    userID: number,
    statCode: string,
    action: StatUpdate,
    changedValue?: number
): Promise<void> => {
    const userStatToUpdate = await statDB.getUserStatByUserAndCode({ userID, statCode });
    if (!userStatToUpdate) throw new Error('Stat not found.');

    const currentStatValue = userStatToUpdate.getStatValue();
    switch (action) {
        case 'INCREASE':
            userStatToUpdate.setStatValue(currentStatValue + 1);
            break;
        case 'DECREASE':
            userStatToUpdate.setStatValue(currentStatValue - 1);
            break;
        case 'CHANGE':
            if (changedValue === null || changedValue === undefined)
                throw new Error('In case of stat change, a changed value is required.');
            userStatToUpdate.setStatValue(changedValue);
            break;
        default:
            throw new Error('The possible actions are: INCREASE, DECREASE and CHANGE.');
    }

    const updatedStat = await statDB.updateStat(userStatToUpdate);
    if (!updatedStat) throw new Error('Error occured updating stat.');
};

export default {
    getAllStats,
    getStatByID,
    getStatByStatCode,
    getStatsByUser,
    updateStat,
};
