import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import { authRouter } from './controller/auth.routes';
import { poopRouter } from './controller/poop.routes';
import { userRouter } from './controller/user.routes';
import { friendsRouter } from './controller/friends.routes';
import { profileRouter } from './controller/profile.routes';

dotenv.config();
const app = express();
const port = Number(process.env.APP_PORT) || 3000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret:
            process.env.JWT_SECRET ||
            'd666a19848375f6a9fd7f2991bc6fce2efcf19b302509cacbcbff9b01b424e76',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /\/api-docs\/*/, '/auth/register', '/auth/login', '/status'],
    })
);

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
app.use('/poop', poopRouter);
app.use('/user', userRouter);
app.use('/friends', friendsRouter);
app.use('/profile', profileRouter);
//#endregion

//#region Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});
//#endregion

app.get('/status', (req, res) => {
    res.json({ message: 'Poopedia API is running' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
