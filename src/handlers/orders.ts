import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders: Order[] = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order: Order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id
  };

  const newOrder: Order = await store.create(order);
  console.log(newOrder);

  res.json(newOrder);
};

const update = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id
  };

  const updateOrder: Order = await store.update(orderId, order);

  res.json(updateOrder);
};

const deleteOrder = async (req: Request, res: Response) => {
  const deleted: Order = await store.delete(req.params.id);

  res.json(deleted);
};

const addProductToOrder = async (req: Request, res: Response) => {
  const order: Order = {
    quantity: req.body.quantity,
    product_id: req.body.product_id,
    order_id: req.body.order_id
  };

  console.log(order);

  const newProductToOrder: Order = await store.addProductToOrder(order);

  res.json(newProductToOrder);
};

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, deleteOrder);
  app.post('/addProduct', verifyAuthToken, addProductToOrder);
};

export default order_routes;
