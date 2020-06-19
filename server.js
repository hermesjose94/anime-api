//Librerias instaladas
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//Librerias propias
import authApi from './routes/auth';
import animesApi from './routes/animes';
import usersApi from './routes/users';
import userAnimesApi from './routes/userAnimes';
import config from './config/index';
import {
  logErrors,
  wrapErrors,
  errorHandler,
} from './utils/middleware/errorHandlers';
import notFoundHandler from './utils/middleware/notFoundHandler';

const app = express();

// enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // url of the frontend application
    credentials: true, // set credentials true for secure httpOnly cookie
  })
);
// parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// use cookie parser for secure httpOnly cookie
app.use(cookieParser(config.authCookieSecret));

//Routes
authApi(app);
animesApi(app);
usersApi(app);
userAnimesApi(app);

//Catch 404
app.use(notFoundHandler);

//Error middlewares
//logErrors
app.use(logErrors);
//Boom
app.use(wrapErrors);
//errorHandler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
