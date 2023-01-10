import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { day, month, year } = request.query

    const listProviderDayAvalability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await listProviderDayAvalability.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(availability)
  }
}

export default ProviderDayAvailabilityController
