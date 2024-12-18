/**
 * @swagger
 *   components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: jwt
 *      schemas:
 *        PoopRequest:
 *          type: object
 *          properties:
 *              dateTime:
 *                  type: string
 *                  format: date-time
 *              type:
 *                  type: number
 *              size:
 *                  type: number
 *              rating:
 *                  type: number
 *              colorID:
 *                  type: number
 *                  required: false
 *              title:
 *                  type: string
 *                  required: false
 *              latitude:
 *                  type: number
 *                  required: false
 *              longitude:
 *                  type: number
 *                  required: false
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
 */
import express, { NextFunction, Request, Response } from 'express';
import { Request as jwtRequest } from 'express-jwt';
import poopService from '../service/poop.service';
import { PoopRequest } from '../types';
import { isAdminOrModeratorOrFriends } from '../middleware/authMiddleware';

const poopRouter = express.Router();

/**
 * @swagger
 * /poop/id/{poopID}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get a poops by ID
 *      parameters:
 *        - in: path
 *          name: poopID
 *          schema:
 *              type: integer
 *              minimum: 1
 *          required: true
 *          description: ID of the poop to get
 *      responses:
 *         200:
 *            description: The poop for the given ID
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/PoopResponse'
 */
// poopRouter.get('/id/:poopID', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const poopID = req.params['poopID'];
//         const result = await poopService.getPoopByID(Number(poopID));
//         return res.status(200).json(result);
//     } catch (err: any) {
//         next(err);
//     }
// });

/**
 * @swagger
 * /poop/user/{userID}:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all poops for a user by their ID
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
 *                      $ref: '#/components/schemas/PoopResponse'
 */
poopRouter.get(
    '/user/:userID',
    isAdminOrModeratorOrFriends,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userID = req.params['userID'];
            const result = await poopService.getPoopsByUser(Number(userID));
            return res.status(200).json(result);
        } catch (err: any) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /poop/friends:
 *   get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all poops for a user and their friends
 *      responses:
 *         200:
 *            description: The poops from the given user and their friends
 *            content:
 *              application/json:
 *                poops:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/PoopResponse'
 */
poopRouter.get('/friends', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const result = await poopService.getPoopsFromUserAndFriendsByUser(userID);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /poop/create:
 *   post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a poop
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PoopRequest'
 *      responses:
 *         200:
 *            description: The created poop.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PoopResponse'
 */
poopRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const poopInput = <PoopRequest>req.body;

        const result = await poopService.createPoop(
            poopInput.dateTime,
            poopInput.type,
            poopInput.size,
            poopInput.rating,
            userID,
            poopInput.colorID,
            poopInput.title,
            poopInput.latitude,
            poopInput.longitude
        );
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

/**
 * @swagger
 * /poop/delete:
 *   delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete a poop
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      poopID:
 *                          type: number
 *                          required: true
 *      responses:
 *         200:
 *            description: The created poop.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PoopResponse'
 */
poopRouter.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = <jwtRequest>req;
        const userID = request.auth?.userID;
        const role = request.auth?.role;
        const { poopID } = req.body;

        const result = await poopService.deletePoop(userID, poopID, role);
        return res.status(200).json(result);
    } catch (err: any) {
        next(err);
    }
});

export { poopRouter };
