import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders: Order[] = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id
  };
  try {
    const newOrder: Order = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const order: Order = {
    order_status: req.body.order_status,
    user_id: req.body.user_id
  };

  try {
    const updateOrder: Order = await store.update(orderId, order);
    res.json(updateOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
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
  try {
    const newProductToOrder: Order = await store.addProductToOrder(order);
    res.json(newProductToOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
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
