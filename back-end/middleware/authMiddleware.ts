import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';
import { Role } from '../types/index';

const isAdmin = async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    const role = <Role>req.auth.role;
    if (role === 'ADMIN') {
        next();
    } else {
        next(
            new UnauthorizedError('credentials_required', {
                message: 'You are not authorized to access this endpoint.',
            })
        );
    }
};

const isAdminOrModerator = async (
    req: Request & { auth: any },
    res: Response,
    next: NextFunction
) => {
    const role = <Role>req.auth.role;
    if (role === 'ADMIN' || role === 'MODERATOR') {
        next();
    } else {
        next(
            new UnauthorizedError('credentials_required', {
                message: 'You are not authorized to access this endpoint.',
            })
        );
    }
};

export { isAdmin, isAdminOrModerator };
