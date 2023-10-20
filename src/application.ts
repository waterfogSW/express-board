import express, { Application as ExApplication, Handler, json, Router, urlencoded } from 'express';
import { MetadataKeys } from "./common/util/metadata.keys";
import { IRouter } from "./common/decorator/handler.decorator";
import { controllers } from "./controller";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";


class Application {
  private readonly _instance: ExApplication;

  constructor() {
    configDotenv();
    this._instance = express();
    this.registerRouters();

    this._instance.use(express.json());
    this._instance.use(cors());
    this._instance.use(json());
    this._instance.use(urlencoded({extended: true}));
    this._instance.use(morgan(process.env.MORGAN_FORMAT || 'dev'));
  }

  get instance(): ExApplication {
    return this._instance;
  }

  private registerRouters() {
    if (controllers.length === 0) {
      console.log("No controllers found");
      return;
    }

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;
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

export default new Application();