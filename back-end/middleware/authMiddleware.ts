import { Role, TokenPayload } from '../types/index';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userDb from '../repository/user.db';

dotenv.config();

const secretKey =
    process.env.JWT_SECRET_KEY || 'TheSuperSecretKeyForWhenTheOtherSuperSecretKeyDoesNotWork';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.header('authorization');
    if (!header) return res.status(401).json({ message: 'Unauthorized, no token.' });
    const token = header.replace('Bearer ', '');

    try {
        const now = Math.round(Date.now() / 1000);
        const decoded = <TokenPayload>jwt.verify(token, secretKey);
        if (now > decoded.exp)
            return res.status(401).json({ message: 'Unauthorized, token expired.' });

        const user = await userDb.getUserByID({ userID: decoded.userID });
        if (!user) return res.status(400).json({ message: 'Unauthorized, user does not exist.' });
        res.locals.userID = user.getUserID();
        res.locals.role = user.getRole();

        next();
    } catch (err: any) {
        return res.status(401).json({ message: 'Unauthorized, invalid token.' });
    }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role: Role = res.locals.role;
    if (role !== 'ADMIN') return res.status(403).json({ message: 'Forbidden.' });
    next();
};

const isAdminOrModerator = async (req: Request, res: Response, next: NextFunction) => {
    const role: Role = res.locals.role;
    if (role !== 'ADMIN' && role !== 'MODERATOR')
        return res.status(403).json({ message: 'Forbidden.' });
    next();
};

export { isAuthenticated, isAdmin, isAdminOrModerator };
