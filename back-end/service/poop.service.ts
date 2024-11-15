import { Poop } from '../model/poop';
import poopDb from '../repository/poop.db';
import userDb from '../repository/user.db';

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

const createPoop = async (
    dateTime: Date,
    type: number,
    size: number,
    rating: number,
    userID: number,
    colorID?: number,
    title?: string,
    latitude?: number,
    longitude?: number
): Promise<Poop> => {
    //TODO: user should be clear from JWT
    const user = await userDb.getUserByID({ userID });
    if (!user) throw new Error('User does not exist.');

    const poop = await poopDb.createPoop(
        new Poop({
            poopID: 0,
            dateTime,
            type,
            size,
            rating,
            userID,
            colorID,
            title,
            latitude,
            longitude,
        })
    );
    if (!poop) throw new Error('Error occured creating poop.');
    return poop;
};

export default { getAllPoops, getPoopsByUser, createPoop };
