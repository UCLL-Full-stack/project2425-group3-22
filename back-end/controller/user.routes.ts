/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        UserResponse:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: number
 *              email:
 *                  type: number
 *              role:
 *                  type: string
 *        UpdateUserInput:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              role:
 *                  type: string
 *        UserInfoResponse:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *              username:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest } from 'express-jwt';
import userService from '../service/user.service';
import { UpdateUserInput } from '../types';
import { isAdminOrModeratorOrFriends } from '../middleware/authMiddleware';

const userRouter = express.Router();

// /**
//  * @swagger
//  * /user/search:
//  *   get:
//  *      security:
//  *          - bearerAuth: []
//  *      summary: Get users whose username contains given username
//  *      parameters:
//  *        - in: query
//  *          name: username
//  *          schema:
//  *              type: string
//  *          required: true
//  *          description: Username of the user to find
//  *      responses:
//  *         200:
//  *            description: The users whose usernames contain the given username
//  *            content:
//  *              application/json:
//  *                schema:
//  *                  $ref: '#/components/schemas/UserInfoResponse'
//  */
// userRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const request = <jwtRequest>req;
//         const userID = request.auth?.userID;
//         const username = <string>req.query?.username;

//         const result = await userService.getUsersByUsername(userID, username);
//         return res.status(200).json(result);
//     } catch (err: any) {
//         next(err);
//     }
// });

/**
 * @swagger
 * /user/id/{userID}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a user by ID
 *      parameters:
 *        - in: path
 *          name: userID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the user to get
 *      responses:
 *         200:
 *            description: The user for the given ID
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserResponse'
 */
userRouter.get(
    '/id/:userID',
    isAdminOrModeratorOrFriends,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userID = req.params['userID'];
            const result = await userService.getUserByID(Number(userID));
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /user/update:
 *   put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update a user's username, email, password & role
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserInput'
 *      responses:
 *         200:
 *            description: The updated user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UserResponse'
 */
userRouter.put('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateUserInput = <UpdateUserInput>req.body;
        const result = await userService.updateUser(
            updateUserInput.userID,
            updateUserInput.username,
            updateUserInput.email,
            updateUserInput.password,
            updateUserInput.role
        );
        res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { userRouter };
