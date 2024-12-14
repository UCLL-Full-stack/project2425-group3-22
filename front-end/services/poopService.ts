import Helper from 'utils/helper';

const getPoops = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/poop', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const createPoop = async ({
    type,
    size,
    colorID,
    rating,
    title,
    latitude,
    longitude,
}: {
    type: number;
    size: number;
    colorID: number | null;
    rating: number;
    title: string;
    latitude: number | null;
    longitude: number | null;
}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/poop/create', {
        method: 'POST',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dateTime: new Date(),
            type,
            size,
            colorID,
            rating,
            title,
            latitude,
            longitude,
        }),
    });
};

const deletePoop = async (poopID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/poop/delete', {
        method: 'DELETE',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            poopID,
        }),
    });
};

const PoopService = {
    getPoops,
    createPoop,
    deletePoop,
};

export default PoopService;
