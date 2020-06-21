// DEBUG=app:* node scripts/mongo/seedAnimes.js
const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const Animes = require('../../utils/mocks/animes');
const AnimesMock = Animes.default;

async function seedAnimes() {
  try {
    const mongoDB = new MongoLib();

    const promises = AnimesMock.map(async (anime) => {
      await mongoDB.create('animes', anime);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} animes have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedAnimes();
