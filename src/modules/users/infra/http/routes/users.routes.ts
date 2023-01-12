import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import multer from 'multer'

import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()
const upload = multer(uploadConfig.multer)

usersRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.create
)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

usersRouter.get('/', usersController.list)

export default usersRouter
