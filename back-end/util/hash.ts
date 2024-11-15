import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const saltRounds = Number(process.env.SALT_ROUNDS || 10);

const hashPassword = async (plainPassword: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
};

const validatePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean | null> => {
    const valid = await bcrypt.compare(plainPassword, hashedPassword);
    return valid;
};

export { hashPassword, validatePassword };
