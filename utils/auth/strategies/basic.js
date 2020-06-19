import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import UserService from '../../../services/users';

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    const userServive = new UserService();
    try {
      const user = await userServive.getUserEmail({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
