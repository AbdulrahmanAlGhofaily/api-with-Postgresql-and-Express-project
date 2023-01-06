import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';

const app: express.Application = express();
dotenv.config();

const { POSTGRES_HOST, PORT } = process.env;
const address = `${POSTGRES_HOST}:${PORT}`;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

product_routes(app);
user_routes(app);
order_routes(app);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
