import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { configDotenv } from "dotenv";

configDotenv();

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`App is listening on port ${ port } \n`);
});