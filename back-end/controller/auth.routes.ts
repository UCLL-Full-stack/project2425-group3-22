//TODO: role is returned as string, should this be as type Role?
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
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { RegisterInput, LoginInput } from '../types';

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
        const RegisterInput = <RegisterInput>req.body;
        const userID = await userService.createUser(
            RegisterInput.username,
            RegisterInput.email,
            RegisterInput.password
        );
        res.status(200).json(userID);
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

        //TODO: temporary uses simple cookie for subsequent requests
        res.cookie('tempIdentification', result, { httpOnly: true, maxAge: 360000 });
        res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { authRouter };
