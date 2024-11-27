import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { LoginResponse } from '../types';
import { generateJwtToken } from '../util/jwt';

const register = async (
    username: string,
    email: string,
    password: string
): Promise<LoginResponse> => {
    if (await checkUsernameInUse(username)) throw new Error('Username already in use.');
    if (await checkEmailInUse(email)) throw new Error('Email already in use.');

    const userToCreate = new User({ userID: 0, username, email, password: password, role: 'USER' });
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    userToCreate.setPassword(hashedPassword);

    const createdUser = await userDb.createUser(userToCreate);
    if (!createdUser) throw new Error('Error occured creating user.');

    const token = await generateJwtToken(createdUser.getUserID(), createdUser.getRole());

    return <LoginResponse>{
        username: createdUser.getUsername(),
        role: createdUser.getRole(),
        token,
    };
};

const login = async (usernameOrEmail: string, password: string): Promise<LoginResponse> => {
    const user = usernameOrEmail.includes('@')
        ? await userDb.getUserByEmail({ email: usernameOrEmail })
        : await userDb.getUserByUsername({ username: usernameOrEmail });

    if (!user)
        throw new Error(
            `User with ${
                usernameOrEmail.includes('@') ? 'email' : 'username'
            } '${usernameOrEmail}' does not exist.`
        );
    if (!(await bcrypt.compare(password, user.getPassword())))
        throw new Error(
            `${usernameOrEmail.includes('@') ? 'Email' : 'Username'} or password incorrect.`
        );

    const token = await generateJwtToken(user.getUserID(), user.getRole());

    return <LoginResponse>{
        username: user.getUsername(),
        role: user.getRole(),
        token,
    };
};

const checkEmailInUse = async (email: string | undefined): Promise<boolean> => {
    if (email) {
        const user = await userDb.getUserByEmail({ email });
        return user ? true : false;
    }
    return false;
};

const checkUsernameInUse = async (username: string | undefined): Promise<boolean> => {
    if (username) {
        const user = await userDb.getUserByUsername({ username });
        return user ? true : false;
    }
    return false;
};

export default { register, login };
