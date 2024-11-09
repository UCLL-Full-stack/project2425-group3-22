import { Poop } from '../model/poop';
import { User } from '../model/user';

const poops: Array<Poop> = [
    new Poop({
        poopID: 1,
        type: 0,
        size: 0,
        dateTime: new Date(),
        user: new User({
            userID: 1,
            username: 'admin',
            email: 'admin@poopedia.com',
            password: 'toBeHashed',
            role: 'Admin',
            poops: [],
        }),
        colorID: 0,
        title: '',
        rating: 0,
        longitude: 0,
        latitude: 0,
    }),
    new Poop({
        poopID: 2,
        type: 0,
        size: 0,
        dateTime: new Date(),
        user: new User({
            userID: 1,
            username: 'admin',
            email: 'admin@poopedia.com',
            password: 'toBeHashed',
            role: 'Admin',
            poops: [],
        }),
        colorID: 0,
        title: '',
        rating: 0,
        longitude: 0,
        latitude: 0,
    }),
    new Poop({
        poopID: 3,
        type: 0,
        size: 0,
        dateTime: new Date(),
        user: new User({
            userID: 2,
            username: 'moderator',
            email: 'moderator@poopedia.com',
            password: 'toBeHashed',
            role: 'Moderator',
            poops: [],
        }),
        colorID: 0,
        title: '',
        rating: 0,
        longitude: 0,
        latitude: 0,
    }),
    new Poop({
        poopID: 4,
        type: 0,
        size: 0,
        dateTime: new Date(),
        user: new User({
            userID: 2,
            username: 'moderator',
            email: 'moderator@poopedia.com',
            password: 'toBeHashed',
            role: 'Moderator',
            poops: [],
        }),
        colorID: 0,
        title: '',
        rating: 0,
        longitude: 0,
        latitude: 0,
    }),
];

const getAllPoops = async (): Promise<Array<Poop> | null> => {
    return poops ?? null;
};

const getPoopsByUser = async ({ userID }: { userID: number }): Promise<Array<Poop> | null> => {
    try {
        const poopArray: Array<Poop> = [];
        poops.forEach((poop) => {
            if (poop.getUser()?.getUserID() === userID) poopArray.push(poop);
        });
        return poopArray ?? null;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const createPoop = async ({
    type,
    size,
    colorID,
    dateTime,
    title,
    rating,
    latitude,
    longitude,
    user,
}: {
    type: number;
    size: number;
    dateTime: Date;
    user: User;
    colorID?: number;
    title?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
}): Promise<Poop> => {
    try {
        const poopID = poops.length + 1;
        const newPoop = new Poop({
            poopID,
            type,
            size,
            colorID,
            dateTime,
            title,
            rating,
            latitude,
            longitude,
            user,
        });
        poops.push(newPoop);

        const createdPoop = poops.find((poop) => poop.getPoopID() === poopID);
        if (!createdPoop) throw new Error('Error occured creating poop.');
        return createdPoop;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

export default { getAllPoops, getPoopsByUser, createPoop };
