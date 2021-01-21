import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as httpException from "http-errors";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne(request.params.id);
    if (user) {
      return user;
    } else {
      next(new httpException(404, "User not found"));
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      let userToRemove = await this.userRepository.findOne(request.params.id);
      await this.userRepository.remove(userToRemove);
    } catch (error) {
      next(new httpException(404, "User not found"));
    }
  }
}
