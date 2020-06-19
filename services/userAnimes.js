import MongoLib from '../lib/mongo';
import AnimesService from './animes';
const animesService = new AnimesService();

class UserAnimesService {
  constructor() {
    this.collection = 'user-animes';
    this.mongoDB = new MongoLib();
  }

  async getUserAnimes({ userId }) {
    const query = userId && { userId };
    const userAnimes = await this.mongoDB.getAll(this.collection, query);

    var animes = [];

    for (const item of userAnimes) {
      const { animeId } = item;
      const anime = await animesService.getAnime({ animeId });
      const {
        _id: id,
        name,
        episode,
        data,
        station,
        cover,
        description,
        source,
        status,
        season,
        premiere,
      } = anime;

      const { _id: id_follow, episode: episode_follow } = item;

      const result = {
        id,
        id_follow,
        name,
        episode,
        episode_follow,
        data,
        station,
        cover,
        description,
        source,
        status,
        season,
        premiere,
      };
      animes.push(result);
    }

    let week = {};
    if (animes.length > 0) {
      for (const anime of animes) {
        if (anime.status !== 'Finalizado') {
          if (!week.hasOwnProperty(anime.premiere)) {
            week[anime.premiere] = [];
          }
          week[anime.premiere].push(anime);
        } else {
          if (!week.hasOwnProperty('Finalizados')) {
            week['Finalizados'] = [];
          }
          week['Finalizados'].push(anime);
        }
      }
    }
    return week;
  }

  async getUserAnime({ userId, animeId }) {
    const query = { userId, animeId };
    const [userAnimes] = await this.mongoDB.getAll(this.collection, query);

    const anime = await animesService.getAnime({ animeId });

    const {
      _id: id,
      name,
      episode,
      data,
      station,
      cover,
      description,
      source,
      status,
      season,
      premiere,
    } = anime;

    const { _id: id_follow, episode: episode_follow } = userAnimes;

    const result = {
      id,
      id_follow,
      name,
      episode,
      episode_follow,
      data,
      station,
      cover,
      description,
      source,
      status,
      season,
      premiere,
    };

    return result;
  }

  async createUserAnime({ userAnime }) {
    const newFollow = { ...userAnime, episode: 1 };
    const createdUserAnimeId = await this.mongoDB.create(
      this.collection,
      newFollow
    );

    return createdUserAnimeId;
  }

  async updateUserAnime({ userAnimeId, userAnime }) {
    const { episode } = userAnime;
    const updatedUserAnimeId = await this.mongoDB.update(
      this.collection,
      userAnimeId,
      {
        episode,
      }
    );
    return updatedUserAnimeId;
  }

  async deleteUserAnime({ userAnimeId }) {
    const deletedUserAnimeId = await this.mongoDB.delete(
      this.collection,
      userAnimeId
    );

    return deletedUserAnimeId;
  }
}

export default UserAnimesService;
