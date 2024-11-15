import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

//TODO: add other necessary validation
export class User {
    private userID: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor({
        userID,
        username,
        email,
        password,
        role,
    }: {
        userID: number;
        username: string;
        email: string;
        password: string;
        role?: Role;
    }) {
        this.userID = userID;

        if (username.includes('@')) throw new Error('Username cannot contain an @.');
        if (username.length < 3 || username.length > 25)
            throw new Error('Username must be between 3 and 25 characters.');
        this.username = username;

        if (!this.validateEmail(email))
            throw new Error('Email must be in format: "name@domain.com".');
        this.email = email;

        //TODO: password hashing functionality! (here or in user.service)
        if (password.length < 8) throw new Error('Password must be 8 characters or longer.');
        this.password = password;

        if (role) {
            this.role = role;
        } else {
            this.role = 'USER';
        }
    }

    getUserID(): number {
        return this.userID;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getRole(): Role {
        return this.role;
    }

    setRole(role: Role) {
        this.role = role;
    }

    validateEmail(email: string): boolean {
        const regexp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regexp.test(email);
    }

    static from({ userID, username, email, password, role }: UserPrisma) {
        return new User({
            userID,
            username,
            email,
            password,
            role: <Role>role,
        });
    }
}
