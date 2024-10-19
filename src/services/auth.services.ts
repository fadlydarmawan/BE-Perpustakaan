import { Request, Response } from "express";
import { ResponseModelWithData,ResponseModelWithDataAbsen,ResponseModelWithDataUserActiveInactive,ResponseModelOnlyMessage, ResponseModelWithDataWithCount,ResponseModelWithPageTotalResultAndLimit,ResponseModelWithSchedule,
        ResponseModelWithToken,ResponseWhenError} from "../constant/response.model";
import StatusCode from "../constant/status.codes";
import { prisma } from "../database/database";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { CreateAdmin } from './../models/user.dto';
import bcrypt from 'bcrypt';

dotenv.config();


export class ServiceAuth{
    public async createAdmin(
        dto: CreateAdmin
    ): Promise <[ResponseModelOnlyMessage, ResponseWhenError]>{
    let resMessage = {} as ResponseModelOnlyMessage;
    let resError = {} as ResponseWhenError;

    try {
        await prisma.user.create({
            data : {
                username: dto.username,
                password: bcrypt.hashSync(dto.password, 10),
                nama: dto.nama,
                no_tlp: Number(dto.no_telp),
            },
        });
        resMessage = {
            status: StatusCode.OK,
            message: 'succesfully user',
            error: false,
          };
    } catch (error) {
        resError = {
            status: StatusCode.BAD_REQUEST,
            message: `something went wrong: ${error}`,
            error : true, 
        }
    }
      return [resMessage, resError];
    }   

};
