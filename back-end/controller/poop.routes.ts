/**
 * @swagger
 *   components:
 *      schemas:
 *        Poop:
 *          type: object
 *          properties:
 *              poopID:
 *                  type: number
 *                  format: int64
 *              type:
 *                  type: number
 *              size:
 *                  type: number
 *              colorID:
 *                  type: number
 *              dateTime:
 *                  type: string
 *                  format: date
 *              title:
 *                  type: string
 *              rating:
 *                  type: number
 *              latitude:
 *                  type: number
 *              longitude:
 *                  type: number
 *              user:
 *                  type: object
 *        PoopInput:
 *          type: object
 *          properties:
 *              type:
 *                  type: number
 *              size:
 *                  type: number
 *              colorID:
 *                  type: number
 *              dateTime:
 *                  type: string
 *                  format: date
 *              title:
 *                  type: string
 *              rating:
 *                  type: number
 *              latitude:
 *                  type: number
 *              longitude:
 *                  type: number
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { RegisterInput, LoginInput } from '../types';

const poopRouter = express.Router();

/**
 * @swagger
 * /poop:
 *   get:
 *      summary: Get all poops
 *      responses:
 *         200:
 *            description: The poops
 *            content:
 *              application/json:
 *                poops:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Poop'
 */
poopRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //TODO: return all poops
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /poop/create:
 *   post:
 *      summary: Create a poop
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PoopInput'
 *      responses:
 *         200:
 *            description: The created poop.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Poop'
 */
poopRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //TODO: create poop
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { poopRouter };
