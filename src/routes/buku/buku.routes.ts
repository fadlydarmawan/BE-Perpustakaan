import { bukuCreate, bukuUpdated } from './../../models/buku.dto';
import { BukuController } from './../../controller/buku.controller';
import { Express } from 'express';

export default function BukuRoutes(bukuApp: Express) {
  const bukuController = new BukuController();
  //get
  bukuApp.get(`/v1/get-buku`, bukuController.getBuku);
  bukuApp.get(`/v1/getById/:bukubyid`, bukuController.getBukuid);
  bukuApp.get(`/v1/get-buku-search`, bukuController.searchBukuAll);

  //post
  bukuApp.post(`/v1/create-buku`, bukuController.createBuku);

  //updated
  bukuApp.put(`/v1/updatedJumlahBuku/:bukubyid1`, bukuController.bukuUpdated);
}
