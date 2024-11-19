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
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const profileRouter = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *      summary: Get the logged in user's account data
 *      responses:
 *         200:
 *            description: The logged in user's data
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //TODO: return account data
        const userID = res.locals.userID;
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /profile/poops:
 *   get:
 *      summary: Get the logged in user's poops
 *      responses:
 *         200:
 *            description: the logged in user's poops
 *            content:
 *              application/json:
 *                  poops:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Poop'
 */
profileRouter.post('/poops', async (req: Request, res: Response, next: NextFunction) => {
    try {
        //TODO: return poops
        const userID = res.locals.userID;
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

export { profileRouter };
