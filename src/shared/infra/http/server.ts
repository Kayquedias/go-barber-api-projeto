import express, { Request, Response ,NextFunction } from 'express';
import { errors } from 'celebrate';

import "dotenv/config";
import 'reflect-metadata';
import "../typeorm"

import routes from './routes';

const app = express()

app.use(express.json())
app.use(routes)
import '@modules/users/repositories/fakes/FakeUsersRepository'

app.use(errors())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  return res.statusCode && res.status(400).json({
    "Error": err.message,
  })
})

app.listen(process.env.PORT, () => console.log('App running on port 3333'))