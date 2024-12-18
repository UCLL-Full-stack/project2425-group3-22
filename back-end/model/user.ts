import {
    User as UserPrisma,
    Stat as StatPrisma,
    Achievement as AchievementPrisma,
} from '@prisma/client';
import { Role } from '../types';
import { Stat } from './stat';
import { Achievement } from './achievement';

export class User {
    private userID: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;
    private achievements?: Array<Achievement>;
    private stats?: Array<Stat>;

    constructor({
        userID,
        username,
        email,
        password,
        role,
        achievements,
        stats,
    }: {
        userID: number;
        username: string;
        email: string;
        password: string;
        role?: Role;
        achievements?: Array<Achievement>;
        stats?: Array<Stat>;
    }) {
        this.validate({ username, email, password });

        this.userID = userID;
        this.username = username;
        this.email = email.toLowerCase();
        this.password = password;

        if (role) {
            this.role = role;
        } else {
            this.role = 'USER';
        }

        this.achievements = achievements;
        this.stats = stats;
    }

    getUserID(): number {
        return this.userID;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string) {
        if (username !== this.username) {
            if (username.includes('@')) throw new Error('Username cannot contain an @.');
            if (username.length < 3 || username.length > 25)
                throw new Error('Username must be between 3 and 25 characters.');
            this.username = username;
        }
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        if (email !== this.email) {
            if (!this.validateEmail(email))
                throw new Error('Email must be in correct format (name@domain.com).');
            this.email = email.toLowerCase();
        }
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string) {
        if (password !== this.password) {
            if (!this.validatePassword(password))
                throw new Error(
                    'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
                );
            this.password = password;
        }
    }

    getRole(): Role {
        return this.role;
    }

    setRole(role: Role) {
        if (role !== this.role) this.role = role;
    }

    getAchievements(): Array<Achievement> | undefined {
        return this.achievements;
    }

    getStats(): Array<Stat> | undefined {
        return this.stats;
    }

    private validate({
        username,
        email,
        password,
    }: {
        username: string;
        email: string;
        password: string;
    }) {
        if (username.includes('@')) throw new Error('Username cannot contain an @.');
        if (username.length < 3 || username.length > 25)
            throw new Error('Username must be between 3 and 25 characters.');

        if (!this.validateEmail(email))
            throw new Error('Email must be in correct format (name@domain.com).');

        if (!this.validatePassword(password))
            throw new Error(
                'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character'
            );
    }

    private validateEmail(email: string): boolean {
        const emailRegex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return emailRegex.test(email);
    }

    private validatePassword(password: string): boolean {
        const passwordRegex = new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );
        return passwordRegex.test(password);
    }

    static from({
        userID,
        username,
        email,
        password,
        role,
        achievements,
        stats,
    }: UserPrisma & { achievements?: Array<AchievementPrisma> } & { stats?: Array<StatPrisma> }) {
        return new User({
            userID,
            username,
            email,
            password,
            role: <Role>role,
            achievements: achievements
                ? achievements.map((achievement) => Achievement.from(achievement))
                : undefined,
            stats: stats ? stats.map((stat) => Stat.from(stat)) : undefined,
        });
    }
}
