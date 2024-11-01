import { Role } from '../types';

export class User {
    private userID: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;

    //TODO: add validation
    constructor(user: {
        userID: number;
        username: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.userID = user.userID;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    //TODO: add setters?
    getUserID(): number | undefined {
        return this.userID;
    }

    getUsername(): string | undefined {
        return this.username;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    getPassword(): string | undefined {
        return this.password;
    }

    getRole(): string | undefined {
        return this.role;
    }
}
