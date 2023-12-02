import 'dotenv/config';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Express, NextFunction, Response } from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as morgan from 'morgan'

const app: Express = express();
const PORT = +process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
morgan(':method :url :status :res[content-length] - :response-time ms')
// security
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'script-src': ["'self'",],
                'img-src': ["'self'",],
            },
        },
        crossOriginResourcePolicy: false,
    }),
);

app.use((_, res: Response, next: NextFunction) => {
    res.setHeader('Permissions-Policy', '');
    next();
});
// app.set('trust proxy', 1); // for session

// to access files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/.well-known', express.static('.well-known'));
app.use('/favicon.ico', express.static('favicon.ico'));

app.set('view engine', 'ejs');

app.disable('x-powered-by');

// database operation logs
// mongoose.set('debug', true);


// Server Listing At
app.listen(PORT, async () => {
    console.log(`Server is Running at http://localhost:` + PORT);
});
