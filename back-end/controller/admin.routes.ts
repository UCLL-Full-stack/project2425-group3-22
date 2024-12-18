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
 *        PoopResponse:
 *          type: object
 *          properties:
 *              poopID:
 *                  type: number
 *                  format: int64
 *              dateTime:
 *                  type: string
 *                  format: date
 *              type:
 *                  type: number
 *              size:
 *                  type: number
 *              rating:
 *                  type: number
 *              user:
 *                  type: object
 *                  properties:
 *                      userID:
 *                          type: number
 *                      username:
 *                          type: string
 *              colorID:
 *                  type: number
 *              title:
 *                  type: string
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
 *        UserResponse:
 *          type: object
 *          properties:
 *              userID:
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: number
 *              email:
 *                  type: number
 *              role:
 *                  type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import achievementService from '../service/achievement.service';
import poopService from '../service/poop.service';
import statService from '../service/stat.service';
import userService from '../service/user.service';
import { isAdminOrModerator } from '../middleware/authMiddleware';

const adminRouter = express.Router();

//#region ACHIEVEMENT endpoints
/**
 * @swagger
 * /admin/achievement:
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
adminRouter.get(
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
 * /admin/achievement/id/{achievementID}:
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
adminRouter.get(
    '/achievement/id/:achievementID',
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
 * /admin/achievement/code/{achievementCode}:
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
adminRouter.get(
    '/achievement/code/:achievementCode',
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
//#endregion

//#region POOP endpoints
/**
 * @swagger
 * /admin/poops:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all poops
 *      responses:
 *         200:
 *            description: All poops
 *            content:
 *              application/json:
 *                poops:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/PoopResponse'
 */
adminRouter.get(
    '/poops',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await poopService.getAllPoops();
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);
//#endregion

//#region STAT endpoints
/**
 * @swagger
 * /admin/stats:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all stats
 *      responses:
 *         200:
 *            description: The stats
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/UserStatResponse'
 */
adminRouter.get(
    '/stats',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await statService.getAllStats();
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /admin/stat/id/{statID}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a stat by ID
 *      parameters:
 *        - in: path
 *          name: statID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the stat to get
 *      responses:
 *         200:
 *            description: The stat for the given ID
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserStatResponse'
 */
adminRouter.get(
    '/stat/id/:statID',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statID = req.params['statID'];
            const result = await statService.getStatByID(Number(statID));
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /admin/stat/code/{statCode}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a stat by Code
 *      parameters:
 *        - in: path
 *          name: statCode
 *          schema:
 *              type: string
 *          required: true
 *          description: Code of the stat to get
 *      responses:
 *         200:
 *            description: The stat for the given Code
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/UserStatResponse'
 */
adminRouter.get(
    '/stat/code/:statCode',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const statCode = req.params['statCode'];
            const result = await statService.getStatByStatCode(statCode);
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);
//#endregion

//#region USER endpoints
/**
 * @swagger
 * /admin/users:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all users
 *      responses:
 *         200:
 *            description: The users
 *            content:
 *              application/json:
 *                users:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/UserResponse'
 */
adminRouter.get(
    '/users',
    isAdminOrModerator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getAllUsers();
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);
//#endregion

export { adminRouter };
