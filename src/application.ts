import express, { Application as ExApplication, Handler, json, Router, urlencoded } from 'express';
import { MetadataKeys } from "./common/constant/metadata.keys";
import { IRouter } from "./common/decorator/handler.decorator";
import { controllers } from "./controller";
import cors from "cors";
import morgan from "morgan";
import { Container } from "./common/util/ioc.container";
import * as http from "http";


export class Application {

  constructor(
    private readonly _instance: ExApplication,
    private readonly container: Container,
  ) {
    this.registerRouters();
    this._instance.use(express.json());
    this._instance.use(cors());
    this._instance.use(json());
    this._instance.use(urlencoded({extended: true}));
    this._instance.use(morgan(process.env.MORGAN_FORMAT || 'dev'));
  }

  public createServer(): http.Server {
    return http.createServer(this._instance)
  }

  private registerRouters() {
    if (controllers.length === 0) {
      throw new Error('No controllers found');
    }

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = this.container.resolve(controllerClass.name) as any;
      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);
      const exRouter: Router = express.Router();

      routers.forEach(({method, path, handlerName}) => {
        exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));
      });

      this._instance.use(basePath, exRouter);
    });
  }
}