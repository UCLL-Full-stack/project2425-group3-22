import { User } from '../model/user';

const users: Array<User> = [
    new User({
        userID: 1,
        username: 'atmin',
        email: 'atmin@poopedia.com',
        password: 'toBeHashed',
        role: 'Admin',
        poops: [],
    }),
    new User({
        userID: 2,
        username: 'moteraiter',
        email: 'moteraiter@poopedia.com',
        password: 'toBeHashed',
        role: 'Moderator',
        poops: [],
    }),
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

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        return users.find((user) => user.getUsername() === username) || null;
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying
        throw new Error('Error occured in repository/user.db.ts/getUserByUsername');
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
const getUserByUsernameAndPassword = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}): Promise<number | null> => {
    try {
        return (
            users
                .find((user) => user.getUsername() === username && user.getPassword() === password)
                ?.getUserID() || null
        );
    } catch (err: any) {
        console.log(err.message);
        //TODO: change error when deploying!
        throw new Error('Error occured in repository/user.db.ts/getUserByUsernameAndPassword');
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
        throw new Error('Error occured in repository/user.db.ts/getUserByEmailAndPassword');
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
}): Promise<number> => {
    const newUser = new User({
        userID: users.length + 1,
        username,
        email,
        password,
        role: 'User',
    });
    users.push(newUser);

    const createdUser = users.find((user) => user.getEmail() === email);
    if (createdUser) {
        return createdUser.getUserID();
    }
    throw new Error('Error occured creating user');
};

export default {
    getUserByID,
    getUserByUsername,
    getUserByEmail,
    getUserByUsernameAndPassword,
    getUserByEmailAndPassword,
    createUser,
};
