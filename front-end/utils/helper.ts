import { userItem } from "@types";
import { NextRouter } from "next/router";
import { Roles } from "@types";

export default class Helper {
    static authorizeUser = (router: NextRouter): number | null => {
        const storedUserID = sessionStorage.getItem('userID')?.toString() || undefined;

        if (storedUserID) {
            return parseInt(storedUserID);
        } else {
            router.replace('/login');
            return null;
        }
    }

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
    }

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
    }

    static login = (router: NextRouter, user: userItem): void => {
        console.log(user);

        sessionStorage.setItem('userID', user.userID.toString());
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('role', user.role);

        router.replace('/');
    }

    static logout = (router: NextRouter): void => {
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        router.replace('/login');
    }

    static getUsername = (): string | undefined => {
        return sessionStorage.getItem('username') || undefined;
    }
}