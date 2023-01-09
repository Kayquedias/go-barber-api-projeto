import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

class AppointmentsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.user.id
      const { providerId, date } = request.body

      const createAppointment = container.resolve(CreateAppointmentService)

      const appointment = await createAppointment.execute({
        providerId,
        userId,
        date,
      })

      return response.status(201).json(appointment)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

export default AppointmentsController
