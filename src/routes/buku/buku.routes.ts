import { bukuCreate, bukuUpdated } from './../../models/buku.dto';
import { BukuController } from './../../controller/buku.controller';
import { Express } from 'express';
import {userControllerr } from '../../controller/user.controller';


export default function BukuRoutes(bukuApp: Express) {
  const bukuController = new BukuController();
  const userController= new userControllerr();
  //get
  bukuApp.get(`/v1/get-buku`, bukuController.getBuku);
  bukuApp.get(`/v1/getById/:bukubyid`, bukuController.getBukuid);
  bukuApp.get(`/v1/get-buku-search`, bukuController.searchBukuAll);

  //post
  bukuApp.post(`/v1/create-buku`, bukuController.createBuku);
  bukuApp.post(`/v1/create-user`,userController.createUser);

  //post user
  bukuApp.post(`/v1/sign-in-user`,userController.signInUser);
 

  //updated 
  bukuApp.put(`/v1/updatedJumlahBuku/:bukubyid1`, bukuController.bukuUpdated);
}
