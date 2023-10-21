import { Request, Response } from 'express';
import { HttpStatus } from '../common/constant/http.status';
import { Injectable } from '../common/decorator/injectable.decorator';
import { UserService } from '../service/user.service';
import Controller from '../common/decorator/controller.decorator';
import { Get } from '../common/decorator/handler.decorator';

@Injectable()
@Controller('/user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {
  }

  @Get('/')
  public getUser (request: Request, response: Response): void {
    const result: string = this.userService.getUser();
    response
      .status(HttpStatus.OK)
      .json({ result });
  }
}
