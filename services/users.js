import MongoLib from '../lib/mongo';
import bcrypt from 'bcrypt';

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ tags }) {
    const query = tags && { tags: { $in: tags } };

    const users = await this.mongoDB.getAll(this.collection, query);
    users.map((user) => {
      delete user.password;
    });
    return users || [];
  }

  async getUser({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    delete user.password;
    return user || {};
  }

  async getUserEmail({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password, isAdmin } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin ? true : false,
    });

    return createUserId;
  }

  async updateUser({ userId, user }) {
    const updatedUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );
    return updatedUserId;
  }

  async updateUserPassword({ userId, user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUserId = await this.mongoDB.update(this.collection, userId, {
      password: hashedPassword,
    });
    return updatedUserId;
  }

  async deleteUser({ userId }) {
    const deletedUserId = await this.mongoDB.delete(this.collection, userId);
    return deletedUserId;
  }
}

export default UsersService;
