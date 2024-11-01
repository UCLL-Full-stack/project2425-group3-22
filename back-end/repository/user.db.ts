import { User } from '../model/user';
import { UserResponse } from '../types';

const users: Array<User> = [
    new User({
        userID: 1,
        username: 'atmin',
        email: 'atmin@poopedia.com',
        password: 'toBeHashed',
        role: 'Admin',
        poops: [],
    }),
    // TODO: create some more dummy users
];

const getUserByID = async ({ userID }: { userID: number }): Promise<User | null> => {
    try {
        return users.find((user) => user.getUserID() === userID) || null;
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying
        throw new Error('Error occured in repository/user.db.ts/getUserByID');
    }
};

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
}): Promise<number | null> => {
    try {
        return (
            users
                .find((user) => user.getEmail() === email && user.getPassword() === password)
                ?.getUserID() || null
        );
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying!
        throw new Error('Error occured in repository/user.db.ts/getUserByEmail');
    }
};

const createUser = async ({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}): Promise<number | undefined> => {
    const newUser = new User({
        userID: users.length + 1,
        username,
        email,
        password,
        role: 'User',
    });
    users.push(newUser);
    return users[users.length - 1].getUserID();
};

export default {
    getUserByID,
    getUserByEmail,
    getUserByEmailAndPassword,
    createUser,
};
