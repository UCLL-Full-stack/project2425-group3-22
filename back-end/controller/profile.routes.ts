/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        UserProfileResponse:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              role:
 *                  type: string
 *              friends:
 *                  type: number
 *              friendRequests:
 *                  type: number
 *        PoopResponse:
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
 *        UserStatResponse:
 *          type: object
 *          properties:
 *              statID:
 *                  type: number
 *              statCode:
 *                  type: string
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              statValue:
 *                  type: number
 *              updatedAt:
 *                  type: string
 *                  format: date
 *        UserAchievementResponse:
 *          type: object
 *          properties:
 *              achievementID:
 *                  type: number
 *              achievementCode:
 *                  type: string
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              achievedLevel:
 *                  type: number
 *              achievedAt:
 *                  type: string
 *                  format: date
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest } from 'express-jwt';
import userService from '../service/user.service';
import poopService from '../service/poop.service';
import statService from '../service/stat.service';
import achievementService from '../service/achievement.service';

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
 *                  $ref: '#/components/schemas/UserProfileResponse'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
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
 *                          $ref: '#/components/schemas/PoopResponse'
 */
profileRouter.get('/poops', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const result = await poopService.getPoopsByUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

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
profileRouter.get('/map', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const result = await poopService.getPoopsForMapByUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /profile/stats:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all stats for logged in user
 *      responses:
 *         200:
 *            description: The stats for the logged in user
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserStatResponse'
 */
profileRouter.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;

        const result = await statService.getStatsByUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /profile/achievements:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all achievements for logged in user
 *      responses:
 *         200:
 *            description: The achievements for the logged in user
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserAchievementResponse'
 */
profileRouter.get('/achievements', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;

        const result = await achievementService.getAchievementsByUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { profileRouter };
