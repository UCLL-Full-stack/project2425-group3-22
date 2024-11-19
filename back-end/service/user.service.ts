//TODO: when creating/updating/deleting a user check wether or not the user that performs the action is allowed to do so (from jwt)
import { Role } from '@prisma/client';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { ReturnUser } from '../types';
import { hashPassword, validatePassword } from '../util/hash';

const getAllUsers = async (): Promise<Array<ReturnUser>> => {
    const users = await userDb.getAllUsers();
    if (!users) throw new Error('No users found.');
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
    const user = await userDb.getUserByID({ userID });
    if (!user) throw new Error('User not found.');
    return <ReturnUser>{
        userID: user.getUserID(),
        username: user.getUsername(),
        email: user.getEmail(),
        role: user.getRole(),
    };
};

const getUserByUsernameAndPassword = async (
    username: string,
    password: string
): Promise<ReturnUser> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user || !(await validatePassword(password, user.getPassword())))
        throw new Error('Username or password incorrect.');
    // TODO: test
    //const valid = await validatePassword(password, user.getPassword());
    //if (!valid) throw new Error('Email or password incorrect.');
    return <ReturnUser>{
        userID: user.getUserID(),
        username: user.getUsername(),
        email: user.getEmail(),
        role: user.getRole(),
    };
};

const getUserByEmailAndPassword = async (email: string, password: string): Promise<ReturnUser> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user || !(await validatePassword(password, user.getPassword())))
        throw new Error('Username or password incorrect.');
    // TODO: test
    //const valid = await validatePassword(password, user.getPassword());
    //if (!valid) throw new Error('Email or password incorrect.');
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
    const hashedPassword = await hashPassword(password);
    userToCreate.setPassword(hashedPassword);

    const createdUser = await userDb.createUser(userToCreate);
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

    const userToUpdate = await userDb.getUserByID({ userID });
    if (!userToUpdate) throw new Error('User not found');
    userToUpdate.setUsername(username);
    userToUpdate.setEmail(email);
    userToUpdate.setPassword(password);
    userToUpdate.setRole(role);
    const hashedPassword = await hashPassword(password);
    userToUpdate.setPassword(hashedPassword);

    const updatedUser = await userDb.updateUser(userToUpdate);
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
        const user = await userDb.getUserByEmail({ email });
        return user ? true : false;
    }
    return false;
};

const checkUsernameInUse = async (username: string | undefined): Promise<boolean> => {
    if (username) {
        const user = await userDb.getUserByUsername({ username });
        return user ? true : false;
    }
    return false;
};

export default {
    getAllUsers,
    getUserByID,
    getUserByUsernameAndPassword,
    getUserByEmailAndPassword,
    createUser,
    updateUser,
};
