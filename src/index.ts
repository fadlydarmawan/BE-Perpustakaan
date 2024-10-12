import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import Router from '../src/routes/routes';
import BodyParser from 'body-parser';
import bodyParser from 'body-parser';

const app = express();
const port = 8090;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

Router(app); //manggil routes
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
