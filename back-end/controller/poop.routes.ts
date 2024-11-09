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
 *              dateTime:
 *                  type: string
 *                  format: date-time
 *              userID:
 *                  type: number
 *              colorID:
 *                  type: number
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
import poopService from '../service/poop.service';
import { PoopInput } from '../types';

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
        const response = await poopService.getAllPoops();
        return res.status(200).json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /poop/{userID}:
 *   get:
 *      summary: Get all poops for a user by its ID
 *      parameters:
 *        - in: path
 *          name: userID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the user for whom to get the poops
 *      responses:
 *         200:
 *            description: The poops for the given user
 *            content:
 *              application/json:
 *                poops:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Poop'
 */
poopRouter.get('/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params['userID'];
        const response = await poopService.getPoopsByUser(Number(userID));
        return res.status(200).json(response);
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
 *              schema:
 *                  $ref: '#/components/schemas/PoopInput'
 *      responses:
 *         200:
 *            description: The created poop.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Poop'
 */
poopRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const poopInput = <PoopInput>req.body;
        const result = await poopService.createPoop(
            poopInput.type,
            poopInput.size,
            poopInput.dateTime,
            poopInput.userID,
            poopInput.colorID,
            poopInput.title,
            poopInput.rating,
            poopInput.latitude,
            poopInput.longitude
        );
        return res.status(200).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { poopRouter };
