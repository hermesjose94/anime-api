import MongoLib from '../lib/mongo';
import { number } from '@hapi/joi';

class AnimesService {
  constructor() {
    this.collection = 'animes';
    this.mongoDB = new MongoLib();
  }

  animesWeek(animes) {
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

  async getAnimes({ tags, order, week, status }) {
    var query = {};
    if (tags && status) {
      query = { tags: { $in: tags }, status: Number(status) };
    } else if (status) {
      query = { status: Number(status) };
    } else if (tags) {
      query = { tags: { $in: tags } };
    }
    var orderBy = {};
    if (order) {
      orderBy = JSON.parse(order);
    }

    const animes = await this.mongoDB.getAll(this.collection, query, orderBy);

    if (week) {
      const result = this.animesWeek(animes);
      return result;
    }
    return animes || [];
  }

  async getAnime({ animeId }) {
    const anime = await this.mongoDB.get(this.collection, animeId);

    return anime || {};
  }

  async createAnime({ anime }) {
    const createAnimeId = await this.mongoDB.create(this.collection, anime);
    return createAnimeId;
  }

  async updateAnime({ animeId, anime } = {}) {
    const updatedAnimeId = await this.mongoDB.update(
      this.collection,
      animeId,
      anime
    );
    return updatedAnimeId;
  }

  async deleteAnime({ animeId }) {
    const deletedAnimeId = await this.mongoDB.delete(this.collection, animeId);
    const query = { animeId };
    var cascade = false;
    const userAnimes = await this.mongoDB.getAll('user-animes', query);
    if (userAnimes.length > 0) {
      cascade = true;
      for (const item of userAnimes) {
        await this.mongoDB.delete('user-animes', item._id);
      }
    }
    return { id: deletedAnimeId, cascade };
  }
}

export default AnimesService;
