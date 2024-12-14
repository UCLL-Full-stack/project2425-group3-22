import { Poop } from '../model/poop';
import database from '../util/database';
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
                    user: { userID: poopPrisma.user.userID, username: poopPrisma.user.username },
                    colorID: poopPrisma.colorID,
                    title: poopPrisma.title,
                    latitude: poopPrisma.latitude,
                    longitude: poopPrisma.longitude,
                }
        );
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getPoopByID = async ({ poopID }: { poopID: number }): Promise<Poop | null> => {
    try {
        const poopPrisma = await database.poop.findFirst({
            where: { poopID: poopID },
            include: { user: true },
        });

        if (!poopPrisma) return null;
        return Poop.from(poopPrisma);
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getPoopsByUser = async ({ userID }: { userID: number }): Promise<Array<Poop> | null> => {
    try {
        const poopsPrisma = await database.poop.findMany({
            where: { userID: userID },
            include: { user: { include: { poops: true } } },
            orderBy: { dateTime: 'desc' },
        });

        if (poopsPrisma.length < 1) return null;
        return poopsPrisma.map((poopPrisma) => Poop.from(poopPrisma));
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const getPoopsFromUserAndFriendsByUser = async ({
    userID,
}: {
    userID: number;
}): Promise<Array<Poop> | null> => {
    try {
        const friendsPrisma = await database.friends.findMany({
            where: { OR: [{ user1ID: userID }, { user2ID: userID }] },
            include: { user1: true, user2: true },
        });
        if (friendsPrisma.length < 1) return null;

        const friendIDs = friendsPrisma.map((friendPrisma) =>
            friendPrisma.user1ID === userID ? friendPrisma.user2ID : friendPrisma.user1ID
        );
        friendIDs.push(userID);

        const poopsPrisma = await database.poop.findMany({
            where: {
                userID: { in: friendIDs },
            },
            include: { user: true },
            orderBy: { dateTime: 'desc' },
        });
        if (poopsPrisma.length < 1) return null;

        return poopsPrisma.map((poopPrisma) => Poop.from(poopPrisma));
    } catch (err: any) {
        console.log(err);
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
        console.log(err);
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
                user: { connect: { userID: poop.getUser().userID } },
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
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

const deletePoop = async ({ poopID }: { poopID: number }): Promise<Boolean> => {
    try {
        await database.poop.delete({
            where: { poopID: poopID },
        });
        return true;
    } catch (err: any) {
        console.log(err);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getAllPoops,
    getPoopByID,
    getPoopsByUser,
    getPoopsFromUserAndFriendsByUser,
    getPoopsForMapByUser,
    createPoop,
    deletePoop,
};
