import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse } from '../types';
import { generateJwtToken } from '../util/jwt';

const register = async (
    username: string,
    email: string,
    password: string
): Promise<AuthenticationResponse> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const userToCreate = new User({ userID: 0, username, email, password: password, role: 'USER' });
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    userToCreate.setPassword(hashedPassword);

    const createdUser = await userDB.createUser(userToCreate);
    if (!createdUser) throw new Error('Error occured creating user.');

    const token = await generateJwtToken(createdUser.getUserID(), createdUser.getRole());

    return <AuthenticationResponse>{
        username: createdUser.getUsername(),
        role: createdUser.getRole(),
        token,
    };
};

const login = async (
    usernameOrEmail: string,
    password: string
): Promise<AuthenticationResponse> => {
    const user = usernameOrEmail.includes('@')
        ? await userDB.getUserByEmail({ email: usernameOrEmail })
        : await userDB.getUserByUsername({ username: usernameOrEmail });

    if (!user || !(await bcrypt.compare(password, user.getPassword())))
        throw new Error(
            `${usernameOrEmail.includes('@') ? 'Email' : 'Username'} or password incorrect.`
        );

    const token = await generateJwtToken(user.getUserID(), user.getRole());

    return <AuthenticationResponse>{
        username: user.getUsername(),
        role: user.getRole(),
        token,
    };
};

const checkEmailInUse = async (email: string | undefined): Promise<Boolean> => {
    if (email) {
        const user = await userDB.getUserByEmail({ email });
        return user ? true : false;
    }
    return false;
};

const checkUsernameInUse = async (username: string | undefined): Promise<Boolean> => {
    if (username) {
        const user = await userDB.getUserByUsername({ username });
        return user ? true : false;
    }
    return false;
};

export default { register, login };
