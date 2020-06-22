//Librerias instaladas
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//Librerias propias
const authApi = require('./routes/auth');
const animesApi = require('./routes/animes');
const usersApi = require('./routes/users');
const userAnimesApi = require('./routes/userAnimes');
const config = require('./config/index');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();

// enable CORS
//  'https://hermesjose94-animes.herokuapp.com',
app.use(cors({ credentials: true, origin: true }));
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
