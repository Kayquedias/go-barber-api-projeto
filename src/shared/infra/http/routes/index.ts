import { Router } from 'express'

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import usersRoutes from '@modules/users/infra/http/routes/users.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRoutes)
routes.use('/password', passwordRouter)

export default routes
