import { User } from './user';

// TODO: add validation & create types for type, size & rating (fe 1-5)?
export class Poop {
    private poopID: number;
    private type: number;
    private size: number;
    private colorID: number;
    private dateTime: Date;
    private title: string;
    private rating: number;
    private latitude: number;
    private longitude: number;
    private user: User;

    constructor(poop: {
        poopID: number;
        type: number;
        size: number;
        colorID: number;
        dateTime: Date;
        title: string;
        rating: number;
        latitude: number;
        longitude: number;
        user: User;
    }) {
        this.poopID = poop.poopID;
        this.type = poop.type;
        this.size = poop.size;
        this.colorID = poop.colorID;
        this.dateTime = poop.dateTime;
        this.title = poop.title;
        this.rating = poop.rating;
        this.latitude = poop.latitude;
        this.longitude = poop.longitude;
        this.user = poop.user;
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
