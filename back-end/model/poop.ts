import { Poop as PoopPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

// TODO: add validation & create types for type, size & rating (fe 1-5)?
export class Poop {
    private poopID: number;
    private dateTime: Date;
    private type: number;
    private size: number;
    private rating: number;
    private userID: number;
    private username?: string;
    private colorID?: number;
    private title?: string;
    private latitude?: number;
    private longitude?: number;

    constructor({
        poopID,
        dateTime,
        type,
        size,
        rating,
        userID,
        username,
        colorID,
        title,
        latitude,
        longitude,
    }: {
        poopID: number;
        dateTime: Date;
        type: number;
        size: number;
        rating: number;
        userID: number;
        username?: string;
        colorID?: number;
        title?: string;
        latitude?: number;
        longitude?: number;
    }) {
        this.poopID = poopID;

        // TODO: find out what the format from front-end is first
        this.dateTime = dateTime;

        if (type < 0 || type > 7)
            throw new Error('Type must be a number from 0 to 7 (0 and 7 included).');
        this.type = type;

        if (size < 0 || size > 100)
            throw new Error('Size must be a number from 0 to 100 (0 and 100 included).');
        this.size = size;

        if (rating < 0 || rating > 5)
            throw new Error('Rating must be a number from 0 to 5 (0 and 5 included).');
        this.rating = rating;

        if (userID < 1) throw new Error('UserID must be bigger than 1.');
        this.userID = userID;
        
        this.username = username;

        //TODO: implement correct ColorID validation after deciding what exactly it'll be
        if (colorID !== undefined && (colorID < 0 || colorID > 10))
            throw new Error('ColorID must be a number from 0 to 10 (0 and 10 included).');
        this.colorID = colorID;

        if (title && title.length > 100)
            throw new Error('Title cannot be longer than 100 characters.');
        this.title = title;

        if (latitude !== undefined && (latitude < -90 || latitude > 90))
            throw new Error('Latitude must be a number between -90 and 90.');
        this.latitude = latitude;

        if (longitude !== undefined && (longitude < -180 || longitude > 180))
            throw new Error('Longitude must be a number between -180 and 180.');
        this.longitude = longitude;
    }

    getPoopID(): number {
        return this.poopID;
    }

    setPoopID(poopID: number) {
        this.poopID = poopID;
    }

    getDateTime(): Date {
        return this.dateTime;
    }

    setDateTime(dateTime: Date) {
        this.dateTime = dateTime;
    }

    getType(): number {
        return this.type;
    }

    setType(type: number) {
        this.type = type;
    }

    getSize(): number {
        return this.size;
    }

    setSize(size: number) {
        this.size = size;
    }

    getRating(): number {
        return this.rating;
    }

    setRating(rating: number) {
        this.rating = rating;
    }

    getUserID(): number {
        return this.userID;
    }

    setUserID(userID: number) {
        this.userID = userID;
    }

    getUsername(): string | undefined {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    getColorID(): number | undefined {
        return this.colorID;
    }

    setColorID(colorID: number) {
        this.colorID = colorID;
    }

    getTitle(): string | undefined {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getLatitude(): number | undefined {
        return this.latitude;
    }

    setLatitude(latitude: number) {
        this.latitude = latitude;
    }

    getLongitude(): number | undefined {
        return this.longitude;
    }

    setLongitude(longitude: number) {
        this.longitude = longitude;
    }

    static from({
        poopID,
        dateTime,
        type,
        size,
        rating,
        user,
        colorID,
        title,
        latitude,
        longitude,
    }: PoopPrisma & { user: UserPrisma }) {
        return new Poop({
            poopID,
            dateTime,
            type,
            size,
            rating,
            userID: User.from(user).getUserID(),
            username: User.from(user).getUsername(),
            colorID: colorID ?? undefined,
            title: title ?? undefined,
            latitude: latitude ?? undefined,
            longitude: longitude ?? undefined,
        });
    }
}
