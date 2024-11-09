type Role = 'User' | 'Moderator' | 'Admin';

type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type LoginInput = {
    usernameOrEmail: string;
    password: string;
};

type UserResponse = {
    userID: number;
    username: string;
    email: string;
    role: Role;
};

// TODO: remove userID from the poopInput, the userID should be pulled from the JWT (passed in authorization header) saved in session
type PoopInput = {
    type: number;
    size: number;
    dateTime: Date;
    userID: number;
    colorID?: number;
    title?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
};

export { Role, RegisterInput, LoginInput, UserResponse, PoopInput };
