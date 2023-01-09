import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price
  };

  try {
    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product: Product = {
    name: req.body.name,
    price: req.body.price
  };
  try {
    const newProduct = await store.update(productId, product);

    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted: String = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', deleteProduct);
};

export default product_routes;
