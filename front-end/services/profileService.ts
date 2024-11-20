import Helper from "utils/helper";

const getProfilePoops = async (UserID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/profile/poops', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const ProfileService = {
    getProfilePoops,
};

export default ProfileService;
