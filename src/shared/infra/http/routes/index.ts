import { Router } from 'express'

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import usersRoutes from '@modules/users/infra/http/routes/users.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRoutes)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/appointments', appointmentsRouter)
routes.use('/providers', providersRouter)

export default routes
