import MongoLib from '../lib/mongo';

class UserAnimesService {
  constructor() {
    this.collection = 'user-animes';
    this.mongoDB = new MongoLib();
  }

  async getUserAnimes({ userId }) {
    const query = userId && { userId };
    const userAnimes = await this.mongoDB.getAll(this.collection, query);

    return userAnimes || [];
  }

  async createUserAnime({ userAnime }) {
    const createdUserAnimeId = await this.mongoDB.create(
      this.collection,
      userAnime
    );

    return createdUserAnimeId;
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
