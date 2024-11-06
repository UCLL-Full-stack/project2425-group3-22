import { User } from './user';

// TODO: add validation & create types for type, size & rating (fe 1-5)?
export class Poop {
    private poopID: number;
    private type: number;
    private size: number;
    private colorID?: number;
    private dateTime: Date;
    private title?: string;
    private rating?: number;
    private latitude?: number;
    private longitude?: number;
    private user: User;

    constructor({
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
    }: {
        poopID: number;
        type: number;
        size: number;
        colorID?: number;
        dateTime: Date;
        title?: string;
        rating?: number;
        latitude?: number;
        longitude?: number;
        user: User;
    }) {
        this.poopID = poopID;

        if (type < 0 || type > 7)
            throw new Error('type must be a number from 0 to 7 (0 and 7 included)');
        this.type = type;

        if (size < 0 || type > 100)
            throw new Error('size must be a number from 0 to 100 (0 and 100 included)');
        this.size = size;

        // TODO: think about the color system (with coloring the poop in the front-end in mind)
        if (colorID) {
            this.colorID = colorID;
        } else {
            this.colorID = 0; //TODO: add default colorID here
        }

        // TODO: find out what the format from front-end is first
        this.dateTime = dateTime;

        if (title) {
            if (title.length > 100) throw new Error('title cannot be longer than 100 characters');
            this.title = title;
        } else {
            this.title = '';
        }

        this.rating = rating;

        if (latitude) {
            if (latitude < -90 || latitude > 90)
                throw new Error('latitude must be a number between -90 and 90');
            this.latitude = latitude;
        } else {
            this.latitude = undefined;
        }

        if (longitude) {
            if (longitude < -180 || longitude > 180)
                throw new Error('longitude must be a number between -180 and 180');
            this.longitude = longitude;
        } else {
            this.longitude = undefined;
        }

        this.user = user;
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

    getColorID(): number | undefined {
        return this.colorID;
    }

    setColorID(colorID: number) {
        this.colorID = colorID;
    }

    getDateTime(): Date | undefined {
        return this.dateTime;
    }

    setDateTime(dateTime: Date) {
        this.dateTime = dateTime;
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

    getUser(): User | undefined {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}
