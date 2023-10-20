import Controller from "../common/decorator/controller.decorator";
import { Get } from "../common/decorator/handler.decorator";
import { Request, Response } from "express";
import { HttpStatus } from "../common/util/http.status";

@Controller('/user')
export default class UserController {

  @Get('/')
  public getUser(request: Request, response: Response): void {
    response
      .status(HttpStatus.OK)
      .json({"test": "test"});
  }

}