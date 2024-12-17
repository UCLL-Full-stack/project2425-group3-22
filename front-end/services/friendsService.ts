import Helper from "utils/helper";

const getFriends = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};


const searchFriends = async (username: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/search?username=' + encodeURIComponent(username), {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const searchUsers = async (username: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/search?username=' + encodeURIComponent(username), {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
}

const sendFriendRequest = async (receiverID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/add', {
        method: 'POST',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverID,
        }),
    });
}

const cancelFriendRequest = async (receiverID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/cancel', {
        method: 'DELETE',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverID,
        }),
    });
}

const acceptFriendRequest = async (senderID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/accept', {
        method: 'PUT',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderID,
        }),
    });
}

const refuseFriendRequest = async (senderID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/refuse', {
        method: 'DELETE',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderID,
        }),
    });
}

const removeFriend = async (userID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/remove', {
        method: 'DELETE',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID,
        }),
    });
}

const FriendsService = {
    getFriends,
    searchFriends,
    searchUsers,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    removeFriend,
};

export default FriendsService;
