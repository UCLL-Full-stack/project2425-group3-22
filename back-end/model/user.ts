import { Role } from '../types';
import { Poop } from './poop';

//TODO: add other necessary validation
export class User {
    private userID: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;
    private poops?: Poop[];

    constructor({
        userID,
        username,
        email,
        password,
        role,
        poops,
    }: {
        userID: number;
        username: string;
        email: string;
        password: string;
        role?: Role;
        poops?: Poop[];
    }) {
        this.userID = userID;

        if (username.length > 3 && username.length < 25 && !username.includes('@')) {
            this.username = username;
        } else {
            throw new Error('username must be between 3 and 25 characters and cannot contain an @');
        }

        if (this.isEmailValid(email)) {
            this.email = email;
        } else {
            throw new Error('email must be in email format (name@domain.com)');
        }

        //TODO: password hashing functionality! (here or in user.service)
        if (password.length > 8) {
            this.password = password;
        } else {
            throw new Error('password must be longer than 8 characters');
        }

        if (role) {
            this.role = role;
        } else {
            this.role = 'User';
        }

        this.poops = poops;
    }

    isEmailValid(email: string): boolean {
        const regexp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regexp.test(email);
    }

    getUserID(): number | undefined {
        return this.userID;
    }

    getUsername(): string | undefined {
        return this.username;
    }

    setUsername(username: string) {
        this.username = username;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getPassword(): string | undefined {
        return this.password;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getRole(): Role | undefined {
        return this.role;
    }

    setRole(role: Role) {
        this.role = role;
    }

    getPoops(): Poop[] | undefined {
        return this.poops;
    }

    setPoops(poops: Poop[]) {
        this.poops = poops;
    }
}
