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

    static setLanguage = (language: string, router: NextRouter): void => {
        console.log('setLanguage', language);

        const newLocale = language;
        const { asPath, pathname, query } = router;

        router.push(
            {
                pathname,
                query,
            },
            asPath,
            { locale: newLocale }
        );
    };

    static getLanguage = (router: NextRouter): string => {
        console.log('getLanguage', router.locale);

        return router.locale || 'en';
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
        if (Helper.authorizeUser(router)) {
            if (Helper.getRole() === Roles.MODERATOR || Helper.getRole() === Roles.ADMIN) {
                return true;
            }
            router.replace('/');
        }
        return false;
    };

    static authorizeAdmin = (router: NextRouter): boolean => {
        if (Helper.authorizeUser(router)) {
            if (Helper.getRole() === Roles.ADMIN) {
                return true;
            }
            router.replace('/');
        }
        return false;
    };
}
