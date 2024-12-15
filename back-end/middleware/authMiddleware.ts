import { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest, UnauthorizedError } from 'express-jwt';
import { Role } from '../types/index';
import friendsDb from '../repository/friends.db';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const request = <jwtRequest>req;
    const role = <Role>request.auth?.role;
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
    const role = <Role>request.auth?.role;
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

const isAdminOrModeratorOrFriends = async (req: Request, res: Response, next: NextFunction) => {
    const request = <jwtRequest>req;
    const role = <Role>request.auth?.role;
    const loggedInUserID = request.auth?.userID;
    const userID = Number(req.params['userID']);

    if (
        role === 'ADMIN' ||
        role === 'MODERATOR' ||
        (await friendsDb.checkIfFriends({ user1ID: loggedInUserID, user2ID: userID }))
    ) {
        next();
    } else {
        next(
            new UnauthorizedError('credentials_required', {
                message: 'You are not authorized to access this data.',
            })
        );
    }
};

export { isAdmin, isAdminOrModerator, isAdminOrModeratorOrFriends };
