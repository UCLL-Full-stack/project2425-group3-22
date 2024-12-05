/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        FriendInfoResponse:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *              username:
 *                  type: string
 *        FriendsInfoResponse:
 *          type: object
 *          properties:
 *              friends:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/FriendInfoResponse'
 *              incoming:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/FriendInfoResponse'
 *              outgoing:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/FriendInfoResponse'
 *        FriendRequestRequest:
 *          type: object
 *          properties:
 *              senderID:
 *                  type: number
 *              receiverID:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest, UnauthorizedError } from 'express-jwt';
import friendsService from '../service/friends.service';
import { FriendRequestRequest } from '../types';

const friendsRouter = express.Router();

/**
 * @swagger
 * /friends:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all friends, incoming friend requests and outgoing friend requests for the logged in user
 *      responses:
 *         200:
 *            description: The friends, incoming friend requests and outgoing friend requests
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendsInfoResponse'
 */
friendsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        if (!request.auth)
            throw new UnauthorizedError('credentials_required', { message: 'Token is required' });

        const userID = request.auth.userID;
        const result = await friendsService.getFriendsInfoForUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/remove/{userID}:
 *   delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a friend
 *      parameters:
 *        - in: path
 *          name: userID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the friend to remove
 *      responses:
 *         200:
 *            description: The deleted friend
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendInfoResponse'
 */
friendsRouter.delete('/remove/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        if (!request.auth)
            throw new UnauthorizedError('credentials_required', { message: 'Token is required' });

        const user1ID = request.auth.userID;
        const user2ID = Number(req.params['userID']);
        const result = await friendsService.removeFriend(user1ID, user2ID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { friendsRouter };
