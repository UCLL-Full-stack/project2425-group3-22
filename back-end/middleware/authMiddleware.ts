import { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest, UnauthorizedError } from 'express-jwt';
import { Role } from '../types/index';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const request = <jwtRequest>req;
    if (!request.auth)
        throw new UnauthorizedError('credentials_required', { message: 'Token is required' });

    const role = <Role>request.auth.role;
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

const isAdminOrModerator = async (req: Request, res: Response, next: NextFunction) => {
    const request = <jwtRequest>req;
    if (!request.auth)
        throw new UnauthorizedError('credentials_required', { message: 'Token is required' });

    const role = <Role>request.auth.role;
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
