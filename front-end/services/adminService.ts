import Helper from "utils/helper";

const getUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/admin/user', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const getPoopsByUserID = async (userID: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/poop/user/' + userID, {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + Helper.getJWT(),
            'Content-Type': 'application/json',
        },
    });
};

const AdminService = {
    getUsers,
    getPoopsByUserID,
  };
  
  export default AdminService;