import { Request, Response } from 'express'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService()

    console.log(request.user.id)
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.status(201).json({ user })
  }
}
