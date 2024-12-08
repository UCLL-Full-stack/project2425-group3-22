//TODO: when creating/updating/deleting a user check wether or not the user that performs the action is allowed to do so (from jwt)
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import { ReturnUser } from '../types';

const getAllUsers = async (): Promise<Array<ReturnUser>> => {
    const users = await userDB.getAllUsers();
    if (!users) return [];
    return users.map(
        (user) =>
            <ReturnUser>{
                userID: user.getUserID(),
                username: user.getUsername(),
                email: user.getEmail(),
                role: user.getRole(),
            }
    );
};

const getUserByID = async (userID: number): Promise<ReturnUser> => {
    const user = await userDB.getUserByID({ userID });
    if (!user) throw new Error('User not found.');
    return <ReturnUser>{
        userID: user.getUserID(),
        username: user.getUsername(),
        email: user.getEmail(),
        role: user.getRole(),
    };
};

const createUser = async (
    username: string,
    email: string,
    password: string
): Promise<ReturnUser> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const userToCreate = new User({ userID: 0, username, email, password: password });
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 12);
    userToCreate.setPassword(hashedPassword);

    const createdUser = await userDB.createUser(userToCreate);
    if (!createdUser) throw new Error('Error occured creating user.');
    return <ReturnUser>{
        userID: createdUser.getUserID(),
        username: createdUser.getUsername(),
        email: createdUser.getEmail(),
        role: createdUser.getRole(),
    };
};

const updateUser = async (
    userID: number,
    username: string,
    email: string,
    password: string,
    role: Role
): Promise<ReturnUser> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const userToUpdate = await userDB.getUserByID({ userID });
    if (!userToUpdate) throw new Error('User not found');
    userToUpdate.setUsername(username);
    userToUpdate.setEmail(email);
    userToUpdate.setPassword(password);
    userToUpdate.setRole(role);
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 12);
    userToUpdate.setPassword(hashedPassword);

    const updatedUser = await userDB.updateUser(userToUpdate);
    if (!updatedUser) throw new Error('Error occured updating user.');
    return <ReturnUser>{
        userID: updatedUser.getUserID(),
        username: updatedUser.getUsername(),
        email: updatedUser.getEmail(),
        role: updatedUser.getRole(),
    };
};

const checkEmailInUse = async (email: string | undefined): Promise<boolean> => {
    if (email) {
        const user = await userDB.getUserByEmail({ email });
        return user ? true : false;
    }
    return false;
};

const checkUsernameInUse = async (username: string | undefined): Promise<boolean> => {
    if (username) {
        const user = await userDB.getUserByUsername({ username });
        return user ? true : false;
    }
    return false;
};

export default {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
};
