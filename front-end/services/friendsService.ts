import Helper from "utils/helper";

const searchFriends = async (username: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/friends/' + username, {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

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
    searchFriends,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    refuseFriendRequest,
    removeFriend,
};

export default FriendsService;
