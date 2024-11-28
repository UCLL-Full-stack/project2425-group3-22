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
friendsRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const userID = req.auth.userID;
        const result = await friendsService.getFriendsInfoForUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { friendsRouter };
