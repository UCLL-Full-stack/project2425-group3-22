import { User } from './user';

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

    //TODO: add getters and setters
}
