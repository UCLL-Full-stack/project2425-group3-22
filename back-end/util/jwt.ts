import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = async (userID: number, role: Role): Promise<string> => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'poopedia' };

    try {
        const token = jwt.sign(
            { userID, role },
            process.env.JWT_SECRET ||
                'd666a19848375f6a9fd7f2991bc6fce2efcf19b302509cacbcbff9b01b424e76',
            options
        );
        return token;
    } catch (err: any) {
        console.log(err);
        throw new Error('Error occured generating JWT token, check server log for more info.');
    }
};

export { generateJwtToken };
