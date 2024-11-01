const loginUser = async ({ email, password }: { email: string, password: string }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const registerUser = async ({ username, email, password }: { username: string, email: string, password: string }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
};

const AuthService = {
    loginUser,
    registerUser,
  };
  
  export default AuthService;