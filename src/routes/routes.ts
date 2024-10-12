import { Express } from 'express';
import BukuRoutes from '../routes/buku/buku.routes';

export default function Router(app: Express) {

  BukuRoutes(app);
}
