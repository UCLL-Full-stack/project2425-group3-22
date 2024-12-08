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
 *        LoginRequest:
 *          type: object
 *          properties:
 *              usernameOrEmail:
 *                  type: string
 *              password:
 *                  type: string
 *        RegisterRequest:
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
import authService from '../service/auth.service';
import { RegisterRequest, LoginRequest } from '../types';

dotenv.config();
const authRouter = express.Router();

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
 *              $ref: '#/components/schemas/RegisterRequest'
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
        const registerRequest = <RegisterRequest>req.body;
        const result = await authService.register(
            registerRequest.username,
            registerRequest.email,
            registerRequest.password
        );
        res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *      summary: Login with a username or email and a password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginRequest'
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
        const loginRequest = <LoginRequest>req.body;
        const result = await authService.login(loginRequest.usernameOrEmail, loginRequest.password);
        res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { authRouter };
