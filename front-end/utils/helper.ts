import { NextRouter } from "next/router";

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

    static authorizeModerator = (): number | null => {
        return null;
    }

    static authorizeAdmin = (): number | null => {
        return null;
    }
}