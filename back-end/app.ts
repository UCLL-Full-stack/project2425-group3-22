import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { isAuthenticated } from './middleware/authMiddleware';
import { authRouter } from './controller/auth.routes';
import { poopRouter } from './controller/poop.routes';
import { userRouter } from './controller/user.routes';
import { friendsRouter } from './controller/friends.routes';
import { profileRouter } from './controller/profile.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//#region Swagger
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Poop API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//#endregion

//#region Routers
app.use('/auth', authRouter);
app.use('/poop', isAuthenticated, poopRouter);
app.use('/user', isAuthenticated, userRouter);
app.use('/friends', isAuthenticated, friendsRouter);
app.use('/profile', isAuthenticated, profileRouter);
//#endregion

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
