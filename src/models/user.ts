import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env as {
  [key: string]: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get users: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get user: ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [u.firstname, u.lastname, hash]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to add user: ${error}`);
    }
  }

  async update(id: string, u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE users SET firstname = $2, lastname = $3, password = $4 WHERE id = $1 RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await connection.query(sql, [id, u.firstname, u.lastname, hash]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update user with id: ${u.id}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      await connection.query(sql, [id]);

      connection.release();

      return 'User has been deleted successfully';
    } catch (error) {
      throw new Error(`Unable to delete user with the id of:${id}. Error type: ${error}`);
    }
  }
}
