import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import SessionsController from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

export default sessionsRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionsController.create
)
