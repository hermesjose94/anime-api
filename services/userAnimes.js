import MongoLib from '../lib/mongo';
import AnimesService from './animes';
const animesService = new AnimesService();

class UserAnimesService {
  constructor() {
    this.collection = 'user-animes';
    this.mongoDB = new MongoLib();
  }

  async getUserAnimes({ userId, tags, order, week, status }) {
    var query2 = {};
    if (tags && status) {
      query2 = { tags: { $in: tags }, status: Number(status) };
    } else if (status) {
      query2 = { status: Number(status) };
    } else if (tags) {
      query2 = { tags: { $in: tags } };
    }
    const query = userId && { ...query2, userId };
    var orderBy = {};
    if (order) {
      orderBy = JSON.parse(order);
    }
    const userAnimes = await this.mongoDB.getAll(
      this.collection,
      query,
      orderBy
    );

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
      return 'anime has this on your list';
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
