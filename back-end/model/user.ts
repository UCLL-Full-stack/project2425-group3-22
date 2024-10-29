import { Role } from '../types';

export class User {
    private userID: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;

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

    //TODO: add getters and setters
}
