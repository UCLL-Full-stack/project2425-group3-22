import { Poop } from '../model/poop';
import {
    PoopResponse,
    PoopForMapResponse,
    PoopForDisplayResponse,
    UserInfoResponse,
} from '../types';
import poopDB from '../repository/poop.db';
import statService from './stat.service';
import { Role } from '@prisma/client';

const getAllPoops = async (): Promise<Array<PoopResponse>> => {
    const poops = await poopDB.getAllPoops();
    if (!poops) return [];

    return poops.map(
        (poop) =>
            <PoopResponse>{
                poopID: poop.getPoopID(),
                dateTime: poop.getDateTime(),
                type: poop.getType(),
                size: poop.getSize(),
                rating: poop.getRating(),
                user: <UserInfoResponse>{
                    userID: poop.getUser()?.getUserID(),
                    username: poop.getUser()?.getUsername(),
                },
                colorID: poop.getColorID(),
                title: poop.getTitle(),
                latitude: poop.getLatitude(),
                longitude: poop.getLongitude(),
            }
    );
};

const getPoopsByUser = async (userID: number): Promise<Array<PoopResponse>> => {
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('UserID is required and must be a positive and whole number.');

    const poops = await poopDB.getPoopsByUser({ userID });
    if (!poops) return [];

    await statService.updateStat(userID, 'S5', 'CHANGE', poops.length);

    return poops.map(
        (poop) =>
            <PoopResponse>{
                poopID: poop.getPoopID(),
                dateTime: poop.getDateTime(),
                type: poop.getType(),
                size: poop.getSize(),
                rating: poop.getRating(),
                user: <UserInfoResponse>{
                    userID: poop.getUser()?.getUserID(),
                    username: poop.getUser()?.getUsername(),
                },
                colorID: poop.getColorID(),
                title: poop.getTitle(),
                latitude: poop.getLatitude(),
                longitude: poop.getLongitude(),
            }
    );
};

const getPoopsFromUserAndFriendsByUser = async (
    userID: number
): Promise<Array<PoopForDisplayResponse>> => {
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('UserID is required and must be a positive and whole number.');

    const poops = await poopDB.getPoopsFromUserAndFriendsByUser({ userID });
    if (!poops) return [];

    return poops.map(
        (poop) =>
            <PoopForDisplayResponse>{
                poopID: poop.getPoopID(),
                dateTime: poop.getDateTime(),
                type: poop.getType(),
                size: poop.getSize(),
                rating: poop.getRating(),
                user: <UserInfoResponse>{
                    userID: poop.getUser()?.getUserID(),
                    username: poop.getUser()?.getUsername(),
                },
                colorID: poop.getColorID(),
                title: poop.getTitle(),
                latitude: poop.getLatitude(),
                longitude: poop.getLongitude(),
                isOwner: poop.getUser()?.getUserID() === userID,
            }
    );
};

const getPoopsForMapByUser = async (userID: number): Promise<Array<PoopForMapResponse>> => {
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('UserID is required and must be a positive and whole number.');

    const poops = await poopDB.getPoopsForMapByUser({ userID });
    if (!poops) return [];

    await statService.updateStat(userID, 'S7', 'CHANGE', poops.length);

    return poops.map(
        (poop) =>
            <PoopForMapResponse>{
                poopID: poop.getPoopID(),
                latitude: Number(poop.getLatitude()),
                longitude: Number(poop.getLongitude()),
            }
    );
};

const createPoop = async (
    dateTime: Date,
    type: number,
    size: number,
    rating: number,
    userID: number,
    colorID?: number,
    title?: string,
    latitude?: number,
    longitude?: number
): Promise<PoopResponse> => {
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('UserID is required and must be a positive and whole number.');

    const poop = await poopDB.createPoop(
        userID,
        new Poop({
            poopID: 0,
            dateTime,
            type,
            size,
            rating,
            colorID: colorID ?? null,
            title: title ?? null,
            latitude: latitude ?? null,
            longitude: longitude ?? null,
        })
    );
    if (!poop) throw new Error('Error occured creating poop.');

    await statUpdate({ userID, type, rating, color: colorID });

    return <PoopResponse>{
        poopID: poop.getPoopID(),
        dateTime: poop.getDateTime(),
        type: poop.getType(),
        size: poop.getSize(),
        rating: poop.getRating(),
        user: <UserInfoResponse>{
            userID: poop.getUser()?.getUserID(),
            username: poop.getUser()?.getUsername(),
        },
        colorID: poop.getColorID(),
        title: poop.getTitle(),
        latitude: poop.getLatitude(),
        longitude: poop.getLongitude(),
    };
};

const deletePoop = async (userID: number, poopID: number, role: Role): Promise<String> => {
    if (!Number.isInteger(userID) || userID <= 0)
        throw new Error('userID is required and must be a positive and whole number.');
    if (!Number.isInteger(poopID) || poopID <= 0)
        throw new Error('poopID is required and must be a positive and whole number.');

    const poopExists = await poopDB.getPoopByID({ poopID });
    if (!poopExists) throw new Error('Poop does not exists.');

    if (poopExists.getUser()?.getUserID() !== userID && role !== 'MODERATOR' && role !== 'ADMIN')
        throw new Error('You are not authorized to delete this poop.');

    const deletedPoop = await poopDB.deletePoop({ poopID });
    if (!deletedPoop) throw new Error('Error occured deleting poop.');
    return 'Poop successfully deleted.';
};

const statUpdate = async ({
    userID,
    type,
    rating,
    color,
}: {
    userID: number;
    type: number;
    rating: number;
    color?: number;
}): Promise<void> => {
    if (rating === 5) await statService.updateStat(userID, 'S6', 'INCREASE');
    if (color === 3) await statService.updateStat(userID, 'S8', 'INCREASE');
    if (color === 15) await statService.updateStat(userID, 'S9', 'INCREASE');
    if (color && [6, 7, 8, 9].includes(color) && [3, 4, 5].includes(type))
        await statService.updateStat(userID, 'S10', 'INCREASE');
    if (type === 1) await statService.updateStat(userID, 'S11', 'INCREASE');
    if (type === 7) await statService.updateStat(userID, 'S12', 'INCREASE');
};

export default {
    getAllPoops,
    getPoopsByUser,
    getPoopsFromUserAndFriendsByUser,
    getPoopsForMapByUser,
    createPoop,
    deletePoop,
};
