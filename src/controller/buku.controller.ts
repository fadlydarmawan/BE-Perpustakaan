import { BukuServices } from './../services/buku.services';
import { Request, Response } from 'express';
import { bukuCreate } from '../models/buku.dto';
import Joi from 'joi';

export class BukuController {
  public async createBuku(req: Request, res: Response): Promise<any> {
    const bukuServices = new BukuServices();
    const dto: bukuCreate = req.body;
    const schema = Joi.object()
      .keys({
        judul: Joi.string().required().messages({
          'string.base': `judul should be a type of string`,
          'string.empty': `judul cannot be an empty field`,
          'any.required': `judul is a required field`,
        }),
        penulis: Joi.string().required().messages({
          'string.base': `penulis should be a type of string`,
          'string.empty': `penulis cannot be an empty field`,
          'any.required': `penulis is a required field`,
        }),
        kategori: Joi.string().required().messages({
          'string.base': `kategori should be a type of string`,
          'string.empty': `kategori cannot be an empty field`,
          'any.required': `kategori is a required field`,
        }),
        penerbit: Joi.string().required().messages({
          'string.base': `penerbit should be a type of string`,
          'string.empty': `penerbit cannot be an empty field`,
          'any.required': `penerbit is a required field`,
        }),
        jumlahStok: Joi.number().required().messages({
          'string.base': `jumlahStok should be a type of number`,
          'string.empty': `jumlahStok cannot be an empty field`,
          'any.required': `jumlahStok is a required field`,
        }),
        tahunPenerbit: Joi.number().required().messages({
          'string.base': `tahunPenerbit should be a type of number`,
          'string.empty': `tahunPenerbit cannot be an empty field`,
          'any.required': `tahunPenerbit is a required field`,
        }),
      })
      .unknown(true);

    const { error } = schema.validate(dto);

    if (error != undefined) {
      return res.status(400).json({
        status: 400,
        message: error?.details.map((e) => e.message).join(','),
        error: true,
      });
    } else {
      const [success, error] = await bukuServices.createBuku(dto);

      if (error.error) {
        return res.status(error.status).json(error);
      } else {
        return res.status(success.status).json(success);
      }
    }
  }
  public async getBuku(req: Request, res: Response): Promise<any> {
    const bukuServices = new BukuServices();
    const [success, error] = await bukuServices.bukuGetAll();

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }

  public async getBukuid(req: Request, res: Response): Promise<any> {
    const bukuServices = new BukuServices();
    const bukubyid = req.params.bukubyid;
    const [success, error] = await bukuServices.bukuGetId(Number(bukubyid));

    if (error.error) {
      return res.status(error.status).json(error);
    } else {
      return res.status(success.status).json(success);
    }
  }
}
