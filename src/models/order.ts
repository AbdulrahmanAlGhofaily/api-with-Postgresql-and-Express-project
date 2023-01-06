import client from '../database';

export type Order = {
  id?: number;
  order_id?: string;
  order_status?: boolean;
  user_id?: string;
  quantity?: number;
  product_id?: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);

      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders: ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to get order: ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';

      const result = await connection.query(sql, [o.user_id, o.order_status]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to add order: ${error}`);
    }
  }

  async update(id: string, o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE orders SET order_status = $2, user_id = $3 WHERE id = $1 RETURNING *';
      const result = await connection.query(sql, [id, o.order_status, o.user_id]);

      connection.release();

      if (result.rowCount === 0) throw new Error(`Order with the id ${id} doesn't exist`);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update order with id ${id}:`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

      const result = await connection.query(sql, [id]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete order with the id of:${id}. Error type: ${error}`);
    }
  }

  async addProductToOrder(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO order_product (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *';
      const result = connection.query(sql, [o.quantity, o.product_id, o.order_id]);

      return (await result).rows[0];
    } catch (error) {
      throw new Error(`Unable to add a product to the order: ${error}`);
    }
  }
}
