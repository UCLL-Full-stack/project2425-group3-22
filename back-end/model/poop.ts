import { User } from './user';
import { Poop as PoopPrisma, User as UserPrisma } from '@prisma/client';

// TODO: add validation & create types for type, size & rating (fe 1-5)?
export class Poop {
    private poopID: number;
    private type: number;
    private size: number;
    private dateTime: Date;
    private user: User;
    private colorID?: number;
    private title?: string;
    private rating?: number;
    private latitude?: number;
    private longitude?: number;

    constructor({
        poopID,
        type,
        size,
        dateTime,
        user,
        colorID,
        title,
        rating,
        latitude,
        longitude,
    }: {
        poopID: number;
        type: number;
        size: number;
        dateTime: Date;
        user: User;
        colorID?: number;
        title?: string;
        rating?: number;
        latitude?: number;
        longitude?: number;
    }) {
        this.poopID = poopID;

        if (type < 0 || type > 7)
            throw new Error('type must be a number from 0 to 7 (0 and 7 included)');
        this.type = type;

        if (size < 0 || type > 100)
            throw new Error('size must be a number from 0 to 100 (0 and 100 included)');
        this.size = size;

        // TODO: find out what the format from front-end is first
        this.dateTime = dateTime;

        // TODO: think about the color system (with coloring the poop in the front-end in mind)
        if (colorID) {
            this.colorID = colorID;
        } else {
            this.colorID = 0; //TODO: add default colorID here
        }

        this.user = user;

        if (title) {
            if (title.length > 100) throw new Error('title cannot be longer than 100 characters');
            this.title = title;
        } else {
            this.title = '';
        }

        this.rating = rating;

        if (latitude !== undefined) {
            if (latitude < -90 || latitude > 90)
                throw new Error('latitude must be a number between -90 and 90');
            this.latitude = latitude;
        } else {
            this.latitude = undefined;
        }

        if (longitude !== undefined) {
            if (longitude < -180 || longitude > 180)
                throw new Error('longitude must be a number between -180 and 180');
            this.longitude = longitude;
        } else {
            this.longitude = undefined;
        }
    }

    getPoopID(): number | undefined {
        return this.poopID;
    }

    setPoopID(poopID: number) {
        this.poopID = poopID;
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

    getDateTime(): Date | undefined {
        return this.dateTime;
    }

    setDateTime(dateTime: Date) {
        this.dateTime = dateTime;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
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

    getRating(): number | undefined {
        return this.rating;
    }

    setRating(rating: number) {
        this.rating = rating;
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
        type,
        size,
        colorID,
        dateTime,
        title,
        rating,
        latitude,
        longitude,
        user,
    }: PoopPrisma & { user?: UserPrisma }) {
        return new Poop({
            poopID,
            type,
            size,
            colorID,
            dateTime,
            title,
            rating,
            latitude,
            longitude,
            user: user ? User.from(user) : undefined,
        });
    }
}
