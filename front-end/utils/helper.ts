import { NextRouter } from 'next/router';
import { Roles } from '@types';

export default class Helper {
    static login = (router: NextRouter, response: any): void => {
        const userData = {
            token: response.token,
            username: response.username,
            role: response.role,
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));
        router.replace('/');
    };

    static logout = (router: NextRouter): void => {
        localStorage.removeItem('userData');
        router.replace('/login');
    };

    static getUserData = (): { token?: string; username?: string; role?: string } => {
        return JSON.parse(localStorage.getItem('userData') || '{}');
    };
    
    static getJWT = (): string | undefined => {
        return this.getUserData().token;
    };
    
    static getUsername = (): string | undefined => {
        return this.getUserData().username;
    };
    
    static getRole = (): string | undefined => {
        return this.getUserData().role;
    };

    static authorizeUser = (router: NextRouter): boolean => {
        if (Helper.getJWT()) {
            return true;
        } else {
            router.replace('/login');
            return false;
        }
    };

    static authorizeModerator = (router: NextRouter): boolean => {
        if (Helper.getJWT()) {
            if (Helper.getRole() === Roles.MODERATOR || Helper.getRole() === Roles.ADMIN) {
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
        if (Helper.getJWT()) {
            if (Helper.getRole() === Roles.ADMIN) {
                return true;
            } else {
                return false;
            }
        } else {
            router.replace('/login');
            return false;
        }
    };
}
