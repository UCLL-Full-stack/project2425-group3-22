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
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              role:
 *                  type: string
 *        LoginInput:
 *          type: object
 *          properties:
 *              usernameOrEmail:
 *                  type: string
 *              password:
 *                  type: string
 *        RegisterInput:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */
import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../service/user.service';
import { RegisterInput, LoginInput } from '../types';

dotenv.config();
const authRouter = express.Router();
const secretKey =
    process.env.JWT_SECRET_KEY || 'TheSuperSecretKeyForWhenTheOtherSuperSecretKeyDoesNotWork';

/**
 * @swagger
 * /auth/register:
 *   post:
 *      summary: Register with a username, an email and a password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterInput'
 *      responses:
 *         200:
 *            description: The logged in user.
 *            content:
 *              application/json:
 *                userID:
 *                  type: number
 *                  format: int64
 */
authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registerInput = <RegisterInput>req.body;
        const result = await userService.createUser(
            registerInput.username,
            registerInput.email,
            registerInput.password
        );
        const token = jwt.sign({ userID: result.userID }, secretKey, { expiresIn: 1440 });
        res.status(200).json({ user: result, jwt: token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *      summary: Login with an email and a password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginInput'
 *      responses:
 *         200:
 *            description: The logged in user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginInput = <LoginInput>req.body;

        const result = loginInput.usernameOrEmail.includes('@')
            ? await userService.getUserByEmailAndPassword(
                  loginInput.usernameOrEmail,
                  loginInput.password
              )
            : await userService.getUserByUsernameAndPassword(
                  loginInput.usernameOrEmail,
                  loginInput.password
              );

        const token = jwt.sign({ userID: result.userID }, secretKey, { expiresIn: 1440 });
        res.status(200).json({ user: result, jwt: token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { authRouter };
