import { Poop } from '../model/poop';
import database from './database';
import { ReturnPoop, ReturnPoopForMap } from '../types';

const getAllPoops = async (): Promise<Array<ReturnPoop> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            include: { user: true },
        });

        if (poopsPrisma.length < 1) return null;
        return poopsPrisma.map(
            (poopPrisma) =>
                <ReturnPoop>{
                    poopID: poopPrisma.poopID,
                    dateTime: poopPrisma.dateTime,
                    type: poopPrisma.type,
                    size: poopPrisma.size,
                    rating: poopPrisma.rating,
                    userID: poopPrisma.user.userID,
                    username: poopPrisma.user.username,
                    colorID: poopPrisma.colorID,
                    title: poopPrisma.title,
                    latitude: poopPrisma.latitude,
                    longitude: poopPrisma.longitude,
                }
        );
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

const getPoopsForMapByUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<ReturnPoopForMap> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            where: { userID: userID, latitude: { not: null }, longitude: { not: null } },
        });

        if (poopsPrisma.length < 1) return null;
        return poopsPrisma.map(
            (poopPrisma) =>
                <ReturnPoopForMap>{
                    poopID: poopPrisma.poopID,
                    latitude: Number(poopPrisma.latitude),
                    longitude: Number(poopPrisma.longitude),
                }
        );
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

export default { getAllPoops, getPoopsByUser, getPoopsForMapByUser, createPoop };
