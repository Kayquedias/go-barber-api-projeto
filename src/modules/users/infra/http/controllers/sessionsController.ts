import { Request, Response } from "express";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = {
      email,
      password
    }

    return response.json({user})
  }
}