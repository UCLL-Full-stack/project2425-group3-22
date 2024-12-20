import { Stat } from '../model/stat';
import statDB from '../repository/stat.db';
import { StatUpdate, UserStatResponse } from '../types';

const getAllStats = async (): Promise<Array<Stat>> => {
    const stats = await statDB.getAllStats();
    if (!stats) return [];
    return stats;
};

const getStatByID = async (statID: number): Promise<Stat> => {
    if (!Number.isInteger(statID) || statID <= 0)
        throw new Error('statID is required and must be a positive whole number.');

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
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('userID is required and must be a positive whole number.');

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
    if (userStatToUpdate) {
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

        await statDB.updateStat(userStatToUpdate);
    }
};

export default {
    getAllStats,
    getStatByID,
    getStatByStatCode,
    getStatsByUser,
    updateStat,
};
