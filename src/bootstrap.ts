import 'reflect-metadata';

import type * as http from 'http';
import express from 'express';
import { Application } from './application';
import { container } from './common/util/ioc.container';
import { configDotenv } from 'dotenv';

configDotenv();
const exApplication: express.Express = express();
const application: Application = new Application(exApplication, container);

const PORT = process.env.PORT ?? 3000;
const bootstrap: http.Server = application.createServer();
bootstrap.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
