type Role = 'USER' | 'MODERATOR' | 'ADMIN';

//#region AUTH types
type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

type LoginRequest = {
    usernameOrEmail: string;
    password: string;
};

type LoginResponse = {
    username: string;
    role: string;
    token: string;
};
//#endregion

//#region User types
type UpdateUserInput = {
    userID: number;
    email: string;
    username: string;
    password: string;
    role: Role;
};

type ReturnUser = {
    userID: number;
    username: string;
    email: string;
    role: Role;
};
//#endregion

//#region POOP types
type PoopRequest = {
    dateTime: Date;
    type: number;
    size: number;
    rating: number;
    colorID?: number;
    title?: string;
    latitude?: number;
    longitude?: number;
};

type ReturnPoop = {
    poopID: number;
    dateTime: Date;
    type: number;
    size: number;
    rating: number;
    user: any;
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

//TODO: add a type that's for returning all poops from logged in user and friends, MUST INCLUDE isOwner property that clarifies wether or not the poop is the user's
//#endregion

//#region FRIEND(S/REQUEST) types
type FriendInfoResponse = {
    userID: number;
    username: string;
};

type FriendsInfoResponse = {
    friends: Array<FriendInfoResponse>;
    incoming: Array<FriendInfoResponse>;
    outgoing: Array<FriendInfoResponse>;
};
//#endregion

export {
    Role,
    RegisterRequest,
    LoginRequest,
    LoginResponse,
    UpdateUserInput,
    ReturnUser,
    PoopRequest,
    ReturnPoop,
    ReturnPoopForMap,
    FriendInfoResponse,
    FriendsInfoResponse,
};
