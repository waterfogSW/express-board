import { Request, Response } from 'express';
import { Injectable } from '../common/decorator/injectable.decorator';
import { UserService } from '../service/user.service';
import { Controller } from '../common/decorator/controller.decorator';
import { Post } from '../common/decorator/handler.decorator';

@Injectable()
@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('/')
  public create(request: Request, response: Response): void {
    const {
      username,
      email,
      password,
    } = request.body;
    this.userService.create(username, email, password);
    response.status(201);
  }
}
