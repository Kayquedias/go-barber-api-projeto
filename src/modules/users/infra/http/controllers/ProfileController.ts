import { Request, Response } from 'express'

import ShowProfileService from '@modules/users/services/ShowProfileService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const showProfile = new ShowProfileService()
    const user = await showProfile.execute({ user_id })

    return response.json({ user })
  }
}
