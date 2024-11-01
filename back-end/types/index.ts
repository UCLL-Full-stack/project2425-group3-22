type Role = 'User' | 'Moderator' | 'Admin';

type RegisterInput = {
    username: string;
    email: string;
    password: string;
};

type LoginInput = {
    email: string;
    password: string;
};

type UserResponse = {
    userID: number;
    username: string;
    email: string;
    role: Role;
};

export { Role, RegisterInput, LoginInput, UserResponse };
