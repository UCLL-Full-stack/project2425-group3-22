import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authRouter } from './controller/auth.routes';
import { poopRouter } from './controller/poop.routes';

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

//TODO: temporary uses simple cookie for subsequent requests, change to JWT later
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieArray: Array<string> | undefined = req.headers.cookie?.split(' ');
        if (!cookieArray)
            return res.status(400).json({ message: 'please login to use the application' });
        const userID = cookieArray
            .find((cookie) => cookie.includes('tempIdentification'))
            ?.split('=')[1]
            .replace(';', ' ');

        res.locals.userID = userID;
        next();
    } catch (err: any) {
        return res.status(400).json({
            message: `error occured searching cookies for jwt and validating it (${err.message})`,
        });
    }
});

app.use('/poop', poopRouter);
//#endregion

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
