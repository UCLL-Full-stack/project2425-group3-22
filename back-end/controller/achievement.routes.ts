/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
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
import achievementService from '../service/achievement.service';
import { isAdminOrModerator } from '../middleware/authMiddleware';

const achievementRouter = express.Router();

/**
 * @swagger
 * /achievement:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all achievements
 *      responses:
 *         200:
 *            description: The achievements
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/UserAchievementResponse'
 */
achievementRouter.get(
    '/',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await achievementService.getAllAchievements();
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /achievement/id/{achievementID}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get an achievement by ID
 *      parameters:
 *        - in: path
 *          name: achievementID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the achievement to get
 *      responses:
 *         200:
 *            description: The achievement for the given ID
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserAchievementResponse'
 */
achievementRouter.get(
    '/id/:achievementID',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const achievementID = req.params['achievementID'];
            const result = await achievementService.getAchievementByID(Number(achievementID));
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /achievement/code/{achievementCode}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get an achievement by Code
 *      parameters:
 *        - in: path
 *          name: achievementCode
 *          schema:
 *              type: string
 *          required: true
 *          description: Code of the achievement to get
 *      responses:
 *         200:
 *            description: The achievement for the given Code
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserAchievementResponse'
 */
achievementRouter.get(
    '/code/:achievementCode',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const achievementCode = req.params['achievementCode'];
            const result = await achievementService.getAchievementByAchievementCode(
                achievementCode
            );
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

export { achievementRouter };
