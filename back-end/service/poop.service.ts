import { Poop } from '../model/poop';
import { ReturnPoop, ReturnPoopForMap } from '../types';
import poopDB from '../repository/poop.db';
import userDB from '../repository/user.db';

const getAllPoops = async (): Promise<Array<ReturnPoop>> => {
    const poops = await poopDB.getAllPoops();
    if (!poops) return [];

    return poops;
};

const getPoopsByUser = async (userID: number): Promise<Array<Poop>> => {
    if (isNaN(userID)) throw new Error('userID is required and must be a number.');

    const poops = await poopDB.getPoopsByUser({ userID });
    if (!poops) return [];

    return poops;
};

const getPoopsForMapByUser = async (userID: number): Promise<Array<ReturnPoopForMap>> => {
    if (isNaN(userID)) throw new Error('userID must be a number.');

    const poops = await poopDB.getPoopsForMapByUser({ userID });
    if (!poops) return [];
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
    if (!dateTime || isNaN(type) || isNaN(size) || isNaN(rating))
        throw new Error(
            'dateTime, type, size and rating are required (type, size and rating must be numbers).'
        );

    const poop = await poopDB.createPoop(
        new Poop({
            poopID: 0,
            dateTime,
            type,
            size,
            rating,
            user: { userID: userID },
            colorID: colorID ?? null,
            title: title ?? null,
            latitude: latitude ?? null,
            longitude: longitude ?? null,
        })
    );
    if (!poop) throw new Error('Error occured creating poop.');
    return poop;
};

const deletePoop = async (loggedInUserID: number, poopID: number): Promise<String> => {
    if (isNaN(poopID)) throw new Error('poopID is required and must be a number.');

    const poopExists = await poopDB.getPoopByID({ poopID });
    if (!poopExists) throw new Error('Poop does not exists');

    if (poopExists.getUser().userID !== loggedInUserID)
        throw new Error('You are not authorized to delete this poop');

    const deletedPoop = await poopDB.deletePoop({ poopID });
    if (!deletedPoop) throw new Error('Error occured deleting poop.');
    return 'Poop successfully deleted.';
};

export default { getAllPoops, getPoopsByUser, getPoopsForMapByUser, createPoop, deletePoop };
