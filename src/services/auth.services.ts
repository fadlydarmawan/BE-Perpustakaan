import { Request, response, Response } from "express";
import { ResponseModelWithData,ResponseModelWithDataAbsen,ResponseModelWithDataUserActiveInactive,ResponseModelOnlyMessage, ResponseModelWithDataWithCount,ResponseModelWithPageTotalResultAndLimit,ResponseModelWithSchedule,
        ResponseModelWithToken,ResponseWhenError} from "../constant/response.model";
import StatusCode from "../constant/status.codes";
import { prisma } from "../database/database";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
import { CreateAdministration } from './../models/user.dto';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { request } from "http";



dotenv.config();


export class ServiceAuth{
  public async createUser (
    dto: CreateAdministration
  ): Promise <[ResponseModelOnlyMessage, ResponseWhenError]> {
    let resMessage = {} as ResponseModelOnlyMessage;
    let resError = {} as  ResponseWhenError;
    console.log(dto.username)
    try{
      
      const Createuser = await prisma.user.create({
        data : {
          username : dto.username,
          password : bcrypt.hashSync(dto.password, 10),
          nama : dto.nama,
          no_tlp : Number(dto.no_tlp)
        }                                                                       
      })
      .then (() => {
        resMessage = {
          status: StatusCode.CREATED,
          message: "Successfully register an Registrasi",
          error: false,
        };
      });
    }
      catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          resError = {
            status: StatusCode.BAD_REQUEST,
            error: true,
            message: `Admin with this Username already exists`,
          };
        } else {
          resError = {
            status: StatusCode.BAD_REQUEST,
            message: `Something went wrong -> ${error}`,
            error: true,
          };
        }
      }
    
    return [resMessage, resError];
  }
    public async signinUser (
    dto : CreateAdministration,
  ): Promise <[ResponseModelWithToken, ResponseWhenError]>{
    let resToken = {} as ResponseModelWithToken;
    let resError = {} as ResponseWhenError;

try {
    let checkExistingUser = await prisma.user.findFirst({
        where: {
            username: dto.username,
        },
    });
    if (checkExistingUser === null) {
        resError = {
            status: StatusCode.BAD_REQUEST,
            message: `User can't be found`,
            error: true,
          };
    } else {
        const bcryptResult = bcrypt.compareSync(
            dto.password,
            checkExistingUser.password
        );
        if (bcryptResult){
            let tokenPayload: any = {
                user_id: checkExistingUser.user_id,
                username: checkExistingUser.username,
            };
            const token = jwt.sign(
                { data: tokenPayload },
                `${process.env.SECRET_KEY}`,
                { expiresIn: "3 days" }
            )
            resToken = {
                status: StatusCode.OK,
                data :{
                    user_id: checkExistingUser.user_id,
                    username: checkExistingUser.username
                },
                token: token,
                message: `succesfully signed`,
                error : true,
            };
        }
    } 
} catch (error) {
    resError = {
        status: StatusCode.BAD_REQUEST,
        message: `something whent wrong -> ${error}`,
        error: true
    }
}

    return [resToken, resError];
  }

}



