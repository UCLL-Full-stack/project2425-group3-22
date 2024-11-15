/**
 * @swagger
 *   components:
 *      schemas:
 *        User:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: number
 *              email:
 *                  type: number
 *              password:
 *                  type: number
 *              role:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { RegisterInput, LoginInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *      summary: Get all users
 *      responses:
 *         200:
 *            description: The users
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUsers();
        return res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { userRouter };
