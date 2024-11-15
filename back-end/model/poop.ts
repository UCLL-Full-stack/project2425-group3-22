import { Poop as PoopPrisma, User as UserPrisma } from '@prisma/client';

// TODO: add validation & create types for type, size & rating (fe 1-5)?
export class Poop {
    private poopID: number;
    private dateTime: Date;
    private type?: number;
    private size?: number;
    private colorID?: number;
    private rating?: number;
    private title?: string;
    private latitude?: number;
    private longitude?: number;
    private userID: number;
    private username?: string;

    constructor({
        poopID,
        dateTime,
        type,
        size,
        colorID,
        rating,
        title,
        latitude,
        longitude,
        userID,
        username,
    }: {
        poopID: number;
        dateTime: Date;
        type?: number;
        size?: number;
        colorID?: number;
        rating?: number;
        title?: string;
        latitude?: number;
        longitude?: number;
        userID: number;
        username?: string;
    }) {
        this.poopID = poopID;

        // TODO: find out what the format from front-end is first
        this.dateTime = dateTime;

        if (type && (type < 1 || type > 7))
            throw new Error('type must be a number from 0 to 7 (0 and 7 included)');
        this.type = type ?? 0;

        if (size && (size < 1 || size > 100))
            throw new Error('size must be a number from 0 to 100 (0 and 100 included)');
        this.size = size ?? 0;

        if (colorID) {
            this.colorID = colorID;
        } else {
            this.colorID = 0;
        }

        this.rating = rating;

        if (title && title.length > 100)
            throw new Error('title cannot be longer than 100 characters');
        this.title = title ?? 'default title';

        if (latitude !== undefined && (latitude < -90 || latitude > 90))
            throw new Error('latitude must be a number between -90 and 90');
        this.latitude = latitude;

        if (longitude !== undefined && (longitude < -180 || longitude > 180))
            throw new Error('longitude must be a number between -180 and 180');
        this.longitude = longitude;

        this.userID = userID;
        this.username = username;
    }

    getPoopID(): number | undefined {
        return this.poopID;
    }

    setPoopID(poopID: number) {
        this.poopID = poopID;
    }

    getDateTime(): Date | undefined {
        return this.dateTime;
    }

    setDateTime(dateTime: Date) {
        this.dateTime = dateTime;
    }

    getType(): number | undefined {
        return this.type;
    }

    setType(type: number) {
        this.type = type;
    }

    getSize(): number | undefined {
        return this.size;
    }

    setSize(size: number) {
        this.size = size;
    }

    getColorID(): number | undefined {
        return this.colorID;
    }

    setColorID(colorID: number) {
        this.colorID = colorID;
    }

    getRating(): number | undefined {
        return this.rating;
    }

    setRating(rating: number) {
        this.rating = rating;
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

    static from({
        poopID,
        dateTime,
        type,
        size,
        colorID,
        rating,
        title,
        latitude,
        longitude,
        user,
    }: PoopPrisma & { user: UserPrisma }) {
        return new Poop({
            poopID,
            dateTime,
            type,
            size,
            colorID,
            rating,
            title,
            latitude,
            longitude,
            userID: user.userID,
            username: user.username,
        });
    }
}
