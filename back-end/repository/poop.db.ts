import { Poop } from '../model/poop';
import { User } from '../model/user';
import database from './database';

const getAllPoops = async (): Promise<Array<Poop> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            include: { user: true },
        });

        if (!poopsPrisma) return null;
        return poopsPrisma.map((poopPrisma) => Poop.from(poopPrisma));
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getPoopsByUser = async ({ userID }: { userID: number }): Promise<Array<Poop> | null> => {
    try {
        const poopArray: Array<Poop> = [];
        // poops.forEach((poop) => {
        //     if (poop.getUser()?.getUserID() === userID) poopArray.push(poop);
        // });
        return poopArray ?? null;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const createPoop = async ({}: {}): Promise<Poop | null> => {
    try {
        return null;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

export default { getAllPoops, getPoopsByUser, createPoop };
