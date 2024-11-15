import poopDb from '../repository/poop.db';
import { Poop } from '../model/poop';
import userService from './user.service';

const getAllPoops = async (): Promise<Array<Poop>> => {
    const poops = await poopDb.getAllPoops();
    if (!poops) throw new Error('No poops found.');
    return poops;
};

const getPoopsByUser = async (userID: number): Promise<Array<Poop>> => {
    if (isNaN(userID)) throw new Error('userID must be a number.');
    const poops = await poopDb.getPoopsByUser({ userID });
    if (!poops) throw new Error('No poops found.');
    return poops;
};

// const createPoop = async (
//     type: number,
//     size: number,
//     dateTime: Date,
//     userID: number,
//     colorID?: number,
//     title?: string,
//     rating?: number,
//     latitude?: number,
//     longitude?: number
// ): Promise<Poop> => {
//     const user = await userService.getUserByID(userID);
//     const newPoop = await poopDb.createPoop({});
//     return newPoop;
// };

export default { getAllPoops, getPoopsByUser /*createPoop*/ };
