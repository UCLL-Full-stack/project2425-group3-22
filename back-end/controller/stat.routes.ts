/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
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
 */
import express, { NextFunction, Request, Response } from 'express';
import statService from '../service/stat.service';
import { isAdminOrModerator } from '../middleware/authMiddleware';

const statRouter = express.Router();

/**
 * @swagger
 * /stat:
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
statRouter.get('/', isAdminOrModerator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await statService.getAllStats();
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /stat/id/{statID}:
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
statRouter.get(
    '/id/:statID',
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
 * /stat/code/{statCode}:
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
statRouter.get(
    '/code/:statCode',
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

export { statRouter };
