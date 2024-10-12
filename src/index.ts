import express, { Express } from 'express';
import bodyParser from 'body-parser';
import Router from './routes/routes';

const app = express();
const port = 3051;
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

Router(app); //manggil routes
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
