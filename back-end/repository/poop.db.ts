import { Poop } from '../model/poop';
import { User } from '../model/user';

const poops: Array<Poop> = [
    new Poop({
        poopID: 1,
        type: 0,
        size: 0,
        colorID: 0,
        dateTime: new Date(),
        title: '',
        rating: 0,
        longitude: 0,
        latitude: 0,
        user: new User({
            userID: 1,
            username: 'atmin',
            email: 'atmin@poopedia.com',
            password: 'toBeHashed',
            role: 'Admin',
            poops: [],
        }),
    }),
];

const getPoopsByUser = async ({}): Promise<Array<Poop> | null> => {
    try {
        return null;
    } catch (err: any) {
        return null;
    }
};

export default { getPoopsByUser };
