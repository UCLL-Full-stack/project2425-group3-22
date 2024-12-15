/**
 * @swagger
 *   components:
 *      schemas:
 *        RegisterRequest:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *        LoginRequest:
 *          type: object
 *          properties:
 *              usernameOrEmail:
 *                  type: string
 *              password:
 *                  type: string
 *        AuthenticationReponse:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              role:
 *                  type: string
 *              toke:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
import { RegisterRequest, LoginRequest } from '../types';

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
 *            description: The registered user.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
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
 *      summary: Login with a username/email and a password
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
 *                  $ref: '#/components/schemas/AuthenticationResponse'
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
