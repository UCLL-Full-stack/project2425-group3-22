/**
 * @swagger
 *   components:
 *      schemas:
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { RegisterInput, LoginInput } from '../types';

const userRouter = express.Router();

export { userRouter };
