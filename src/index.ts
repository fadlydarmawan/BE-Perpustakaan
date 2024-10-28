import express, { Express } from 'express';
import bodyParser from 'body-parser';
import Router from './routes/routes';
import cors from 'cors';
const app = express();
const port = 3051;

const corsOptions = {
  origin: ['http://localhost:3051', 'http://103.193.176.166:3051'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(bodyParser.urlencoded({ extended: true }));

Router(app); 

//app use
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(cors(corsOptions));
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); //manggil routes musti diakhir
});
