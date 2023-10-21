import Controller from "../common/decorator/controller.decorator";
import { Get } from "../common/decorator/handler.decorator";
import { Request, Response } from "express";
import { HttpStatus } from "../common/constant/http.status";
import { Injectable } from "../common/decorator/injectable.decorator";

@Injectable()
@Controller('/actuator')
export class DefaultController {

  @Get('/health')
  public health(request: Request, response: Response): void {
    response
      .status(HttpStatus.OK)
      .json({"status": "UP"});
  }

}
