import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    const token: string = authHeader?.split(' ')[1] as string;
    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(498);
    res.json('Error: Token is missing.');
  }
};
