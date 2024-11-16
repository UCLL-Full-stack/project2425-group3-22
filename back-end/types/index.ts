type Role = 'USER' | 'MODERATOR' | 'ADMIN';

//#region AUTH types
type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type LoginInput = {
    usernameOrEmail: string;
    password: string;
};
//#endregion

//#region User types
type UserResponse = {
    userID: number;
    username: string;
    email: string;
    role: Role;
};
//#endregion

//#region POOP types
// TODO: remove userID from the poopInput, the userID should be pulled from the JWT (passed in authorization header) saved in session
type PoopInput = {
    dateTime: Date;
    type: number;
    size: number;
    rating: number;
    colorID?: number;
    title?: string;
    latitude?: number;
    longitude?: number;
    userID: number;
};

type ReturnPoop = {
    poopID: number;
    dateTime: Date;
    type: number;
    size: number;
    rating: number;
    userID: number;
    username: string | null;
    colorID: number | null;
    title: string | null;
    latitude: number | null;
    longitude: number | null;
};

type ReturnPoopForMap = {
    poopID: number;
    latitude: number;
    longitude: number;
};
//#endregion

export { Role, RegisterInput, LoginInput, UserResponse, PoopInput, ReturnPoop, ReturnPoopForMap };
