/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
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
 *        ReturnPoopForMap:
 *          type: object
 *          properties:
 *              poopID:
 *                  type: number
 *              latitude:
 *                  type: number
 *              longitude:
 *                  type: number
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import poopService from '../service/poop.service';

const profileRouter = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get the logged in user's account data
 *      responses:
 *         200:
 *            description: The logged in user's data
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ReturnUser'
 */
profileRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const userID = req.auth.userID;
        const result = await userService.getUserByID(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /profile/poops:
 *   get:
 *      security:
 *          - bearerAuth: []
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
profileRouter.get(
    '/poops',
    async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
        try {
            const userID = req.auth.userID;
            const result = await poopService.getPoopsByUser(userID);
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

// TODO: should be admin, moderator? or a friend of said user?
/**
 * @swagger
 * /profile/map:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all poops to show on map for the logged in user
 *      responses:
 *         200:
 *            description: The poops for the given user
 *            content:
 *              application/json:
 *                poops:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ReturnPoopForMap'
 */
profileRouter.get(
    '/map',
    async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
        try {
            const userID = req.auth.userID;
            const result = await poopService.getPoopsForMapByUser(userID);
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

export { profileRouter };
