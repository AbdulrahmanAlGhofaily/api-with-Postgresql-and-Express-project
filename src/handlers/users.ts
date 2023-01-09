import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);

    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userNewInfo: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  try {
    const userUpdated = await store.update(userId, userNewInfo);

    res.json(userUpdated);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted: String = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, deleteUser);
};

export default user_routes;
