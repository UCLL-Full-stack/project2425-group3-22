import { userItem } from '@types';
import { NextRouter } from 'next/router';
import { Roles } from '@types';

export default class Helper {
    static authorizeUser = (router: NextRouter): number | null => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || undefined;

        if (storedUserID) {
            return parseInt(storedUserID);
        } else {
            router.replace('/login');
            return null;
        }
    };

    static authorizeModerator = (router: NextRouter): number | null => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || undefined;
        const storedRole = sessionStorage.getItem('role') || undefined;

        if (storedUserID) {
            if (storedRole === Roles.MODERATOR || storedRole === Roles.ADMIN) {
                return parseInt(storedUserID);
            } else {
                return null;
            }
        } else {
            router.replace('/login');
            return null;
        }
    };

    static authorizeAdmin = (router: NextRouter): number | null => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || undefined;
        const storedRole = sessionStorage.getItem('role') || undefined;

        if (storedUserID) {
            if (storedRole === Roles.ADMIN) {
                return parseInt(storedUserID);
            } else {
                return null;
            }
        } else {
            router.replace('/login');
            return null;
        }
    };

    static login = (router: NextRouter, response: any): void => {
        const user: userItem = response.user;

        sessionStorage.setItem('jwt', response.jwt);

        sessionStorage.setItem('userID', user.userID.toString());
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('role', user.role);

        router.replace('/');
    };

    static logout = (router: NextRouter): void => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        router.replace('/login');
    };

    static getUserID = (): number | undefined => {
        const userId = sessionStorage.getItem('userID');
        return userId ? parseInt(userId) : undefined;
    };

    static getUsername = (): string | undefined => {
        return sessionStorage.getItem('username') || undefined;
    };

    static getJWT = (): string | undefined => {
        return sessionStorage.getItem('jwt') || undefined;
    };
}
