const getProfilePoops = async (UserID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/poop/' + UserID, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const ProfileService = {
    getProfilePoops,
};

export default ProfileService;
