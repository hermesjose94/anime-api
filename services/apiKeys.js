import MongoLib from '../lib/mongo';

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

export default ApiKeysService;
