import { Poop as PoopPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class Poop {
    private poopID: number;
    private dateTime: Date;
    private type: number;
    private size: number;
    private rating: number;
    private user?: User;
    private colorID: number | null;
    private title: string | null;
    private latitude: number | null;
    private longitude: number | null;

    constructor({
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
    }: {
        poopID: number;
        dateTime: Date;
        type: number;
        size: number;
        rating: number;
        user?: User;
        colorID: number | null;
        title: string | null;
        latitude: number | null;
        longitude: number | null;
    }) {
        this.validate({
            dateTime,
            type,
            size,
            rating,
            colorID,
            title,
            latitude,
            longitude,
        });

        this.poopID = poopID;
        this.dateTime = dateTime;
        this.type = type;
        this.size = size;
        this.rating = rating;
        this.user = user;
        this.colorID = colorID;
        this.title = title;
        this.latitude = latitude;
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

    getUser(): User | undefined {
        return this.user;
    }

    getColorID(): number | null {
        return this.colorID;
    }

    setColorID(colorID: number) {
        this.colorID = colorID;
    }

    getTitle(): string | null {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getLatitude(): number | null {
        return this.latitude;
    }

    setLatitude(latitude: number) {
        this.latitude = latitude;
    }

    getLongitude(): number | null {
        return this.longitude;
    }

    setLongitude(longitude: number) {
        this.longitude = longitude;
    }

    private validate({
        dateTime,
        type,
        size,
        rating,
        colorID,
        title,
        latitude,
        longitude,
    }: {
        dateTime: Date;
        type: number;
        size: number;
        rating: number;
        colorID: number | null;
        title: string | null;
        latitude: number | null;
        longitude: number | null;
    }) {
        if (!this.validateDateTime(dateTime))
            throw new Error('DateTime must be in correct format (2024-01-01T00:00:00.000Z)');

        if (type < 0 || type > 7) throw new Error('Type must be a number from 0 to 7.');

        if (size < 0 || size > 100) throw new Error('Size must be a number from 0 to 100.');

        if (rating < 0 || rating > 5 || (rating % 1 !== 0 && rating % 1 !== 0.5))
            throw new Error('Rating must be a number from 0 to 5 (whole or ending in .5).');

        //TODO: implement correct ColorID validation after deciding what exactly it'll be
        if (colorID !== null && (colorID < 0 || colorID > 15))
            throw new Error('ColorID must be a number from 0 to 15.');

        if (title && title.length > 100)
            throw new Error('Title cannot be longer than 100 characters.');

        if (latitude !== null && (latitude < -90 || latitude > 90))
            throw new Error('Latitude must be a number between -90 and 90.');

        if (longitude !== null && (longitude < -180 || longitude > 180))
            throw new Error('Longitude must be a number between -180 and 180.');
    }

    private validateDateTime(dateTime: Date): boolean {
        const dateTimeRegex = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        return dateTimeRegex.test(typeof dateTime === 'object' ? dateTime.toISOString() : dateTime);
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
    }: PoopPrisma & { user?: UserPrisma }) {
        return new Poop({
            poopID,
            dateTime,
            type,
            size,
            rating,
            user: user ? User.from(user) : undefined,
            colorID: colorID ?? null,
            title: title ?? null,
            latitude: latitude ?? null,
            longitude: longitude ?? null,
        });
    }
}
