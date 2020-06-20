import MongoLib from '../lib/mongo';
import AnimesService from './animes';
const animesService = new AnimesService();

class UserAnimesService {
  constructor() {
    this.collection = 'user-animes';
    this.mongoDB = new MongoLib();
  }

  async getUserAnimes({ userId, tags, order, week, status }) {
    const query = userId && { userId };
    const userAnimes = await this.mongoDB.getAll(this.collection, query);
    var animes = [];
    var orderBy = {};
    if (order) {
      orderBy = JSON.parse(order);
    }

    const animesAll = await animesService.getAnimes({
      tags,
      order,
      status,
    });

    if (animesAll.length > 0) {
      for (const item of userAnimes) {
        var animeList = animesAll.find((anime) => anime._id == item.animeId);
        if (animeList) {
          const {
            _id,
            name,
            episode,
            station,
            cover,
            description,
            source,
            status,
            season,
            premiere,
          } = animeList;

          const { _id: id_follow, episode: episode_follow } = item;

          const result = {
            _id,
            id_follow,
            name,
            episode,
            episode_follow,
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
      }
    }
    if (week) {
      const result = animesService.animesWeek(animes);
      return result;
    }
    return animes;
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
    const { userId, animeId } = userAnime;
    const query = { userId, animeId };

    const userAnimes = await this.mongoDB.getAll(this.collection, query);

    if (userAnimes.length === 0) {
      const createdUserAnimeId = await this.mongoDB.create(
        this.collection,
        newFollow
      );

      return createdUserAnimeId;
    } else {
      return null;
    }
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
