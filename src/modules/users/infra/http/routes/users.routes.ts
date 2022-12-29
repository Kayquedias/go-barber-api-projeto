import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'

import uploadConfig from 'src/config/upload'
import multer from 'multer'

import { UsersController } from '../controllers/userController'
import UserAvatarController from '../controllers/UserAvatarController'

//import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()
const usersAvatarController = new UserAvatarController()
const upload = multer(uploadConfig.multer)

export default usersRouter.post(
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
  // ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
)

usersRouter.get('/', usersController.list)
