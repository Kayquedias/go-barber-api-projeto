import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { year, month } = request.query

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const availability = await listProviderMonthAvailability.execute({
      providerId,
      year: Number(year),
      month: Number(month),
    })

    return response.json(availability)
  }
}

export default ProviderMonthAvailabilityController
