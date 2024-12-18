type Role = 'USER' | 'MODERATOR' | 'ADMIN';
type StatUpdate = 'INCREASE' | 'DECREASE' | 'CHANGE';

//#region ACHIEVEMENT types
type AchievementDescription = {
    english: string;
    nederlands: string;
};

type AchievementResponse = {
    achievementID: number;
    achievementCode: string;
    name: string;
    description: AchievementDescription;
    levels: Array<number>;
    levelsCriteria: Array<number>;
    statID: number;
};

type UserAchievementResponse = {
    achievementID: number;
    achievementCode: string;
    name: string;
    description: AchievementDescription;
    achievedLevel: number;
    achievedAt: Date;
    nextLevel: string;
};
//#endregion

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

type AuthenticationResponse = {
    username: string;
    role: string;
    token: string;
};
//#endregion

//#region FRIEND(S/REQUEST) types
type FriendStats = {
    friends: number;
    friendRequests: number;
};

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

type PoopResponse = {
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

type PoopForMapResponse = {
    poopID: number;
    latitude: number;
    longitude: number;
};

type PoopForDisplayResponse = {
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
    isOwner: boolean;
};
//#endregion

//#region STAT types
type StatResponse = {
    statID: number;
    statCode: string;
    name: string;
    description: string;
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

type UserResponse = {
    userID: number;
    username: string;
    email: string;
    role: Role;
};

type UserProfileResponse = {
    userID: number;
    username: string;
    email: string;
    role: Role;
    friends?: number;
    friendRequests?: number;
};

type UserInfoResponse = {
    userID: number;
    username: string;
};
//#endregion

//#region STAT types
type UserStatResponse = {
    statID: number;
    statCode: string;
    name: string;
    description: string;
    statValue: number;
    updatedAt: Date;
};
//#endregion

export {
    Role,
    StatUpdate,
    AchievementDescription,
    AchievementResponse,
    UserAchievementResponse,
    RegisterRequest,
    LoginRequest,
    AuthenticationResponse,
    FriendStats,
    FriendInfoResponse,
    FriendsInfoResponse,
    PoopRequest,
    PoopResponse,
    PoopForMapResponse,
    PoopForDisplayResponse,
    StatResponse,
    UpdateUserInput,
    UserResponse,
    UserProfileResponse,
    UserInfoResponse,
    UserStatResponse,
};
