/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        ReturnUser:
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
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UpdateUserInput } from '../types';
import { isAdmin, isAdminOrModeratorOrFriends } from '../middleware/authMiddleware';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all users
 *      responses:
 *         200:
 *            description: The users
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ReturnUser'
 */
userRouter.get('/', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /user/{userID}:
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
 *                      $ref: '#/components/schemas/ReturnUser'
 */
userRouter.get(
    '/:userID',
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
 *                  $ref: '#/components/schemas/ReturnUser'
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
