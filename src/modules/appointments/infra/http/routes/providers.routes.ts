import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerDayAvailabilityController =
  new ProviderDayAvailabilityController()
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)

providersRouter.get(
  '/:providerId/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index
)

providersRouter.get(
  '/:providerId/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index
)

export default providersRouter
