import { userItem } from '@types';
import { NextRouter } from 'next/router';
import { Roles } from '@types';

export default class Helper {
    static authorizeUser = (router: NextRouter): boolean => {
        const JWT = sessionStorage.getItem('jwt') || undefined;

        if (JWT) {
            return true;
        } else {
            router.replace('/login');
            return false;
        }
    };

    static authorizeModerator = (router: NextRouter): boolean => {
        const JWT = sessionStorage.getItem('jwt') || undefined;
        const storedRole = sessionStorage.getItem('role') || undefined;

        if (JWT) {
            if (storedRole === Roles.MODERATOR || storedRole === Roles.ADMIN) {
                return true;
            } else {
                return false;
            }
        } else {
            router.replace('/login');
            return false;
        }
    };

    static authorizeAdmin = (router: NextRouter): boolean => {
        const JWT = sessionStorage.getItem('jwt') || undefined;
        const storedRole = sessionStorage.getItem('role') || undefined;

        if (JWT) {
            if (storedRole === Roles.ADMIN) {
                return true;
            } else {
                return false;
            }
        } else {
            router.replace('/login');
            return false;
        }
    };

    static login = (router: NextRouter, response: any): void => {
        sessionStorage.setItem('jwt', response.token);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('role', response.role);

        router.replace('/');
    };

    static logout = (router: NextRouter): void => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        router.replace('/login');
    };

    static getUsername = (): string | undefined => {
        return sessionStorage.getItem('username') || undefined;
    };

    static getJWT = (): string | undefined => {
        return sessionStorage.getItem('jwt') || undefined;
    };
}
