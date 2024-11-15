import { Poop } from '../model/poop';
import database from './database';

const getAllPoops = async (): Promise<Array<Poop> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            include: { user: true },
        });

        if (poopsPrisma.length < 1) return null;
        return poopsPrisma.map((poopPrisma) => Poop.from(poopPrisma));
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getPoopsByUser = async ({ userID }: { userID: number }): Promise<Array<Poop> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            where: { userID: userID },
            include: { user: true },
        });

        if (poopsPrisma.length < 1) return null;
        return poopsPrisma.map((poopPrisma) => Poop.from(poopPrisma));
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const createPoop = async (poop: Poop): Promise<Poop | null> => {
    try {
        const poopPrisma = await database.poop.create({
            data: {
                dateTime: poop.getDateTime(),
                type: poop.getType(),
                size: poop.getSize(),
                rating: poop.getRating(),
                user: { connect: { userID: poop.getUserID() } },
                colorID: poop.getColorID(),
                title: poop.getTitle(),
                latitude: poop.getLatitude(),
                longitude: poop.getLongitude(),
            },
            include: { user: true },
        });
        if (!poopPrisma) return null;
        return Poop.from(poopPrisma);
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

export default { getAllPoops, getPoopsByUser, createPoop };
