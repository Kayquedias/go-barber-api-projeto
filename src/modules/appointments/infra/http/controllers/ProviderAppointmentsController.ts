import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id
    const { day, month, year } = request.query

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(instanceToPlain(appointments))
  }
}

export default ProviderAppointmentsController
