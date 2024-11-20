/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        ReturnFriendRequest:
 *          type: object
 *          properties:
 *              senderID:
 *                  type: number
 *              senderUsername:
 *                  type: number
 *              receiverID:
 *                  type: string
 *              receiverUsername:
 *                  type: string
 *        FriendRequestInput:
 *          type: object
 *          properties:
 *              senderID:
 *                  type: number
 *              receiverID:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import friendsService from '../service/friends.service';
import { FriendRequestInput } from '../types';

const friendsRouter = express.Router();

/**
 * @swagger
 * /friends:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all incoming friend requests
 *      responses:
 *         200:
 *            description: The incoming friend requests
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ReturnFriendRequest'
 */
friendsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await friendsService.getAllIncomimgFriendRequestsForUser(res.locals.userID);
        return res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { friendsRouter };
