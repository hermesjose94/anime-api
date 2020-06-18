import MongoLib from '../lib/mongo';

class AnimesService {
  constructor() {
    this.collection = 'animes';
    this.mongoDB = new MongoLib();
  }

  async getAnimes({ tags }) {
    const query = tags && { tags: { $in: tags } };

    const animes = await this.mongoDB.getAll(this.collection, query);
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
    return deletedAnimeId;
  }
}

export default AnimesService;
