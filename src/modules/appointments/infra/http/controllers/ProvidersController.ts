import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({ userId })

    return response.json(instanceToPlain(providers))
  }
}

export default ProvidersController
