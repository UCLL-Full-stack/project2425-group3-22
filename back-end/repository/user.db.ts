import { User } from '../model/user';
import { UserResponse } from '../types';

const users: Array<User> = [
    new User({
        userID: 1,
        username: 'atmin',
        email: 'atmin@poopedia.com',
        password: 'toBeHashed',
        role: 'Admin',
    }),
    // TODO: create some more dummy users
];

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        return users.find((user) => user.getEmail() === email) || null;
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying
        throw new Error('Error occured in repository/user.db.ts/getUserByEmail');
    }
};

//TODO: do not return full user since it includes the password, return a DTO instead
const getUserByEmailAndPassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<User | null> => {
    try {
        return (
            users.find((user) => user.getEmail() === email && user.getPassword() === password) ||
            null
        );
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying!
        throw new Error('Error occured in repository/user.db.ts/getUserByEmail');
    }
};

export default {
    getUserByEmail,
    getUserByEmailAndPassword,
};
