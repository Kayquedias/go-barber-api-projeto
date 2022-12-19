import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { UsersController } from "../controllers/userController";

const usersRouter = Router()
const usersController = new UsersController()

export default usersRouter.post('/', 
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }),
  usersController.create
)