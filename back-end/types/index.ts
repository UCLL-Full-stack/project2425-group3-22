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

type PoopInput = {
    type: number;
    size: number;
    colorID?: number;
    dateTime: Date;
    title?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
};

export { Role, RegisterInput, LoginInput, UserResponse };
