import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'

import AppError from '../../errors/AppError'
import routes from './routes'

import '../typeorm'
import '../../container/index'

const app = express()

app.use(express.json())
app.use(routes)

app.use(errors())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  // console.log(err)

  return res.status(500).json({
    status: 'error',
    message: err.message,
  })
})

app.listen(process.env.PORT, () => console.log('App running on port 3333'))
