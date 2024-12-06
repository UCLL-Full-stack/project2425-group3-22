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

export const colorMap: Record<number, string> = {
    1: '#7D6156',
    2: '#56453D',
    3: '#BA8D00',
    4: '#BF7946',
    5: '#A45E2A',
    6: '#87490C', // normal
    7: '#753100', // normal
    8: '#682A01', // normal
    9: '#521F00',
    10: '#401203',
    11: '#270B00',
    12: '#4F0101',
    13: '#5E0000',
    14: '#7B0100',
    15: '#960001',
};