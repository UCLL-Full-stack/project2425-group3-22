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
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest } from 'express-jwt';
import friendsService from '../service/friends.service';

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
        const userID = request.auth?.userID;

        const result = await friendsService.getFriendsInfoForUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/search:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get friends whose username contains given username
 *      parameters:
 *        - in: query
 *          name: username
 *          schema:
 *              type: string
 *          required: true
 *          description: Username of the friend to find
 *      responses:
 *         200:
 *            description: The friends whose usernames contain the given username
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendInfoResponse'
 */
friendsRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const username = <string>req.query?.username;

        const result = await friendsService.getFriendsByUsername(userID, username);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/add:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Send a friendrequest to add a new friend
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  receiverID:
 *                      type: number
 *      responses:
 *         200:
 *            description: The user to whom the friendrequest was sent
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendInfoResponse'
 */
friendsRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const senderID = request.auth?.userID;
        const { receiverID } = req.body;

        const result = await friendsService.sendFriendRequest(senderID, receiverID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/cancel:
 *   delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Cancel a friendrequest
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  receiverID:
 *                      type: number
 *      responses:
 *         200:
 *            description: The error or success message
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 */
friendsRouter.delete('/cancel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const senderID = request.auth?.userID;
        const { receiverID } = req.body;

        const result = await friendsService.cancelFriendRequest(senderID, receiverID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/accept:
 *   put:
 *      security:
 *          - bearerAuth: []
 *      summary: Accept a friendrequest
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  senderID:
 *                      type: number
 *      responses:
 *         200:
 *            description: The user of whom to accept the friendrequest
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendInfoResponse'
 */
friendsRouter.put('/accept', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const { senderID } = req.body;
        const receiverID = request.auth?.userID;

        const result = await friendsService.acceptFriendRequest(senderID, receiverID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/refuse:
 *   delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Refuse a friendrequest
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  senderID:
 *                      type: number
 *      responses:
 *         200:
 *            description: The error or success message
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 */
friendsRouter.delete('/refuse', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const { senderID } = req.body;
        const receiverID = request.auth?.userID;

        const result = await friendsService.refuseFriendRequest(senderID, receiverID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /friends/remove:
 *   delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a friend
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  userID:
 *                      type: number
 *      responses:
 *         200:
 *            description: The deleted friend
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/FriendInfoResponse'
 */
friendsRouter.delete('/remove', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const loggedInUserID = request.auth?.userID;
        const { userID } = req.body;

        const result = await friendsService.removeFriend(loggedInUserID, userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { friendsRouter };
