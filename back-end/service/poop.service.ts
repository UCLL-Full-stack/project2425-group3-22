import { Poop } from '../model/poop';
import { PoopResponse, PoopForMapResponse, PoopForDisplayResponse } from '../types';
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
                user: {
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
    if (isNaN(userID)) throw new Error('UserID is required and must be a number.');

    const poops = await poopDB.getPoopsByUser({ userID });
    if (!poops) return [];

    //TODO: update STATS
    await statService.updateStat(userID, 'S5', 'CHANGE', poops.length);

    return poops.map(
        (poop) =>
            <PoopResponse>{
                poopID: poop.getPoopID(),
                dateTime: poop.getDateTime(),
                type: poop.getType(),
                size: poop.getSize(),
                rating: poop.getRating(),
                user: {
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
    if (isNaN(userID)) throw new Error('userID is required and must be a number.');

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
                user: poop.getUser(),
                colorID: poop.getColorID(),
                title: poop.getTitle(),
                latitude: poop.getLatitude(),
                longitude: poop.getLongitude(),
                isOwner: poop.getUser()?.getUserID() === userID,
            }
    );
};

const getPoopsForMapByUser = async (userID: number): Promise<Array<PoopForMapResponse>> => {
    if (isNaN(userID)) throw new Error('UserID is required and must be a number.');

    const poops = await poopDB.getPoopsForMapByUser({ userID });
    if (!poops) return [];

    //TODO: update STATS
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
    if (!dateTime || isNaN(type) || isNaN(size) || isNaN(rating))
        throw new Error(
            'dateTime, type, size and rating are required (type, size and rating must be numbers).'
        );

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

    //TODO: update STATS
    if (poop.getRating() === 5) await statService.updateStat(userID, 'S6', 'INCREASE');

    return <PoopResponse>{
        poopID: poop.getPoopID(),
        dateTime: poop.getDateTime(),
        type: poop.getType(),
        size: poop.getSize(),
        rating: poop.getRating(),
        user: {
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
    if (isNaN(poopID)) throw new Error('poopID is required and must be a number.');

    const poopExists = await poopDB.getPoopByID({ poopID });
    if (!poopExists) throw new Error('Poop does not exists');

    if (poopExists.getUser()?.getUserID() !== userID && role !== 'MODERATOR' && role !== 'ADMIN')
        throw new Error('You are not authorized to delete this poop');

    const deletedPoop = await poopDB.deletePoop({ poopID });
    if (!deletedPoop) throw new Error('Error occured deleting poop.');
    return 'Poop successfully deleted.';
};

export default {
    getAllPoops,
    getPoopsByUser,
    getPoopsFromUserAndFriendsByUser,
    getPoopsForMapByUser,
    createPoop,
    deletePoop,
};
