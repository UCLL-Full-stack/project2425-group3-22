export type poopItem = {
    poopID: number,
    colorID: number,
    dateTime: string,
    rating: number,
    size: number,
    title: string,
    type: number,
    latitude: number,
    longitude: number,
    user: userItem
};

export type userItem = { 
    userID: number,
    username: string,
    email: string,
    role: string
    poops: poopItem[]
};

export enum Roles {
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}