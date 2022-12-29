import Router from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController'

const passwordRouter = Router()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create
)

export default passwordRouter
