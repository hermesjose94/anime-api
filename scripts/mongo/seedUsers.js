// DEBUG=app:* node scripts/mongo/seedUsers.js

require('@babel/register')({
  presets: ['@babel/preset-env'],
});

require('@babel/polyfill');

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const mongoLib = require('../../lib/mongo');
const MongoLib = mongoLib.default;
const Config = require('../../config/index');
const config = Config.default;

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true,
  },
  {
    email: 'user@undefined.sh',
    name: 'User Public',
    password: config.defaultUserPassword,
    isAdmin: false,
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      debug(chalk.green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();
