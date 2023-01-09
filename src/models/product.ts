import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get prroducts: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);

      connection.release();

      if (result.rowCount === 0) throw new Error(`Product with the id ${id} doesn't exist`);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get product: ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      if (!p.name || !p.price) throw new Error('name and price most be added.');
      const connection = await client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await connection.query(sql, [p.name, p.price]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to add prroduct: ${error}`);
    }
  }

  async update(id: string, p: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE products SET name = $2, price = $3 WHERE id = $1 RETURNING *';
      const result = await connection.query(sql, [id, p.name, p.price]);

      connection.release();

      if (result.rowCount === 0) throw new Error(`Product with the id ${id} doesn't exist`);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update product with id ${id}:`);
    }
  }

  async delete(id: string): Promise<String> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);

      connection.release();

      return 'Product has been deleted successfully';
    } catch (error) {
      throw new Error(`Unable to delete product with the id of:${id}. Error type: ${error}`);
    }
  }
}
