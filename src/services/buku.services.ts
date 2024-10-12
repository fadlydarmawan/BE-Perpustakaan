import { bukuCreate, bukuUpdated } from './../models/buku.dto';
import { Express } from 'express';
import { prisma } from './../database/database';
import {
  ResponseModelOnlyMessage,
  ResponseModelWithData,
  ResponseModelWithDataUserActiveInactive,
  ResponseModelWithDataWithCount,
  ResponseModelWithPageTotalResultAndLimit,
  ResponseModelWithToken,
  ResponseWhenError,
} from '../constant/response.model';
import { promises } from 'dns';
import StatusCode from '../constant/status.codes';
import { error } from 'console';
import { number } from 'joi';

export class BukuServices {
  public async createBuku(
    dto: bukuCreate
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let resMessage = {} as ResponseModelOnlyMessage;
    let resError = {} as ResponseWhenError;
    try {
      const createBukus = await prisma.buku.create({
        data: {
          judul: dto.judul,
          penulis: dto.penulis,
          kategori: dto.kategori.toString(),
          penerbit: dto.penerbit,
          jumlahStok: Number(dto.jumlahStok), //Buat DB INT "2019" 2019
          tahunPenerbit: Number(dto.tahunPenerbit),
        },
      });

      resMessage = {
        status: StatusCode.OK,
        message: 'succesfully create buku',
        error: false,
      };
    } catch (error) {
      console.log(error);
      resError = {
        status: StatusCode.BAD_REQUEST,
        message: `Something went wrong: ${error}`,
        error: true,
      };
    }
    return [resMessage, resError];
  }
  public async bukuGetAll(): Promise<
    [ResponseModelWithData, ResponseWhenError]
  > {
    let resData = {} as ResponseModelWithData;
    let resError = {} as ResponseWhenError;
    try {
      const getAllBukus = await prisma.buku.findMany();
      resData = {
        status: StatusCode.OK,
        message: 'succesfuly get',
        error: false,
        data: getAllBukus,
      };
    } catch (error) {
      resError = {
        status: StatusCode.BAD_REQUEST,
        message: `Something Went Wrong: ${error}`,
        error: true,
      };
    }
    return [resData, resError];
  }
  public async bukuGetId(
    idBuku: number
  ): Promise<[ResponseModelWithData, ResponseWhenError]> {
    let resData = {} as ResponseModelWithData;
    let resError = {} as ResponseWhenError;
    console.log('ID BUKU -> ', idBuku);
    try {
      const getById = await prisma.buku.findFirst({
        where: {
          id: Number(idBuku),
        },
      });

      if (!getById) {
        resError = {
          status: StatusCode.NOT_FOUND,
          message: "buku with this by id was'nt found",
          error: true,
        };
        return [resData, resError];
      }

      resData = {
        status: StatusCode.OK,
        message: 'Successfully get buku  by id',
        error: false,
        data: getById,
      };
    } catch (error) {
      resError = {
        status: StatusCode.BAD_REQUEST,
        message: `Something went wrong: ${error}`,
        error: true,
      };
    }
    return [resData, resError];
  }
  public async updateBuku(
    idBukuu: number
  ): Promise<[ResponseModelOnlyMessage, ResponseWhenError]> {
    let resMessage = {} as ResponseModelOnlyMessage;
    let resError = {} as ResponseWhenError;

    try {
      const getbukubyid1 = await prisma.buku.findFirst({
        where: {
          id: Number(idBukuu),
        },
      });
      if (!getbukubyid1) {
        resError = {
          status: StatusCode.NOT_FOUND,
          message: "buku with this by id was'nt found",
          error: true,
        };

        return [resMessage, resError];
      }
      // jika jumlahstok buku kosong maka {ini kondisinya}
      if (getbukubyid1.jumlahStok === 0) {
        resError = {
          status: StatusCode.BAD_REQUEST,
          message: 'jumlah buku sudah kosong',
          error: true,
        };
      }

      const updateBukuu = await prisma.buku.update({
        where: {
          id: Number(idBukuu),
        },
        data: {
          jumlahStok: getbukubyid1.jumlahStok - 1,
        },
      });
      resMessage = {
        status: StatusCode.OK,
        message: 'succesfuly get',
        error: false,
      };
    } catch (error) {
      resError = {
        status: StatusCode.BAD_REQUEST,
        message: `Something went wrong:${error}`,
        error: true,
      };
    }

    return [resMessage, resError];
  }
}
