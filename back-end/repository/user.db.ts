import { User } from '../model/user';

const users: Array<User> = [
    new User({
        userID: 1,
        username: 'admin',
        email: 'admin@poopedia.com',
        password: 'toBeHashed',
        role: 'Admin',
        poops: [],
    }),
    new User({
        userID: 2,
        username: 'moderator',
        email: 'moderator@poopedia.com',
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
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        return users.find((user) => user.getUsername() === username) || null;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        return users.find((user) => user.getEmail() === email) || null;
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
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
        throw new Error('Database error, check log for more information.');
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
        throw new Error('Database error, check log for more information.');
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
    try {
        const userID = users.length + 1;
        const newUser = new User({
            userID,
            username,
            email,
            password,
            role: 'User',
        });
        users.push(newUser);

        const createdUser = users.find((user) => user.getUserID() === userID);
        if (!createdUser) throw new Error('Error occured creating user');
        return createdUser.getUserID();
    } catch (err: any) {
        console.log(err.message);
        throw new Error('Database error, check log for more information.');
    }
};

export default {
    getUserByID,
    getUserByUsername,
    getUserByEmail,
    getUserByUsernameAndPassword,
    getUserByEmailAndPassword,
    createUser,
};
