type Role = 'USER' | 'MODERATOR' | 'ADMIN';

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

export { Role, RegisterInput, LoginInput, UserResponse, PoopInput };
