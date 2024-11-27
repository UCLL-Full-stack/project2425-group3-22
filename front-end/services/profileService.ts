import Helper from "utils/helper";

const getProfilePoops = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/profile/poops', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const getProfileMap = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/profile/map', { // TODO: edit link when changed in backend
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const ProfileService = {
    getProfilePoops,
    getProfileMap,
};

export default ProfileService;
