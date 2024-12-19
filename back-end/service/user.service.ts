import bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import friendsDB from '../repository/friends.db';
import { UserInfoResponse, UserProfileResponse, UserResponse } from '../types';

const getAllUsers = async (): Promise<Array<UserResponse>> => {
    const users = await userDB.getAllUsers();
    if (!users) return [];
    return users.map(
        (user) =>
            <UserResponse>{
                userID: user.getUserID(),
                username: user.getUsername(),
                email: user.getEmail(),
                role: user.getRole(),
            }
    );
};

const getUserByID = async (userID: number): Promise<UserProfileResponse> => {
    const user = await userDB.getUserByID({ userID });
    const friendsInfo = await friendsDB.getFriendStatsByUser({ userID });

    if (!user) throw new Error('User not found.');
    return <UserProfileResponse>{
        userID: user.getUserID(),
        username: user.getUsername(),
        email: user.getEmail(),
        role: user.getRole(),
        friends: friendsInfo.friends,
        friendRequests: friendsInfo.friendRequests,
    };
};

const getUsersByUsername = async (
    userID: number,
    username: string
): Promise<Array<UserInfoResponse>> => {
    if (!username || username.length < 3)
        throw new Error('Username is required and must be at least 3 characters.');

    const notIDs = [userID];
    const friends = await friendsDB.getAllFriendsByUser({ userID });
    const incomingFriendRequests = await friendsDB.getAllIncomingFriendRequestsByUser({ userID });
    const outgoingFriendRequests = await friendsDB.getAllOutgoingFriendRequestsByUser({ userID });
    if (friends)
        friends.map((friend) =>
            notIDs.push(friend.getUser1ID() === userID ? friend.getUser2ID() : friend.getUser1ID())
        );
    if (incomingFriendRequests) incomingFriendRequests.map((ifr) => notIDs.push(ifr.getSenderID()));
    if (outgoingFriendRequests)
        outgoingFriendRequests.map((ofr) => notIDs.push(ofr.getReceiverID()));

    const users = await userDB.getUsersByUsername({ notIDs, username });
    if (!users) return [];

    return users.map(
        (user) =>
            <UserInfoResponse>{
                userID: user.getUserID(),
                username: user.getUsername(),
            }
    );
};

const createUser = async (
    username: string,
    email: string,
    password: string
): Promise<UserResponse> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const userToCreate = new User({ userID: 0, username, email, password: password });
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 12);
    userToCreate.setPassword(hashedPassword);

    const createdUser = await userDB.createUser(userToCreate);
    if (!createdUser) throw new Error('Error occured creating user.');

    return <UserResponse>{
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
): Promise<UserResponse> => {
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
    return <UserResponse>{
        userID: updatedUser.getUserID(),
        username: updatedUser.getUsername(),
        email: updatedUser.getEmail(),
        role: updatedUser.getRole(),
    };
};

const deleteUser = async (executerID: number, userID: number, role: Role): Promise<String> => {
    if (isNaN(userID) || userID <= 0)
        throw new Error('userToDeleteID is required and must be a positive whole number.');

    const userExists = await userDB.getUserByID({ userID });
    if (!userExists) throw new Error('User does not exists.');

    if (userExists.getUserID() !== executerID && role !== 'MODERATOR' && role !== 'ADMIN')
        throw new Error('You are not authorized to delete this user.');

    const deletedUser = await userDB.deleteUser({ userID });
    if (!deletedUser) throw new Error('Error occured deleting user.');
    return 'User successfully deleted.';
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
    getUsersByUsername,
    createUser,
    updateUser,
    deleteUser,
};
