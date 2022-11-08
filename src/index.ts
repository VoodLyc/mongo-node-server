import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from  './utils/connect'
import cors from 'cors'
import routes from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

routes(app)
connect()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});