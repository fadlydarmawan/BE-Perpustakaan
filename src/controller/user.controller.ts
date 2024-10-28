import { ServiceAuth } from "../services/auth.services";
import { Request, Response } from "express";
import { CreateAdministration, signInUserr } from "../models/user.dto";
import Joi from "joi";
import { failedResponse, failedResponseValidation } from '../constant/failed.codes';

// export class userControllerr {
//     public async adminCreate(req: Request, res: Response):Promise <any> {
//         const userServices = new ServiceAuth();
//         const dto: CreateAdministration = req.body;
//         const schema = Joi.object()
//         .keys({
//         username: Joi.string().required().messages({
//           'string.base': `username should be a type of string`,
//           'string.empty': `username cannot be an empty field`,
//           'any.required': `username is a required field`,
//         }),
//         password: Joi.string().required().messages({
//           'string.base': `password should be a type of string`,
//           'string.empty': `password cannot be an empty field`,
//           'any.required': `password is a required field`,
//         }),
//         nama: Joi.string().required().messages({
//           'string.base': `nama should be a type of string`,
//           'string.empty': `nama cannot be an empty field`,
//           'any.required': `nama is a required field`,
//         }),
//         no_tlp: Joi.string().required().messages({
//           'string.base': `no_tlp should be a type of string`,
//           'string.empty': `no_tlp cannot be an empty field`,
//           'any.required': `no_tlp is a required field`,
//         }),
//       })
//       .unknown(true);
//       const {error} = schema.validate(dto);
//       if (error !== undefined) {
//         return failedResponseValidation(res, true, error?.details.map((e) => e.message).join(","), 400)
//     }
//     }
// } 

export class userControllerr {
    public async createUser(req: Request, res: Response): Promise <any>  {
      const CreateUser= new ServiceAuth();
      const dto: CreateAdministration = req.body;
      console.log(dto.username)
      const schema = Joi.object()
        .keys({
          username: Joi.string().required().messages({
            "string.base": `username should be a type of string`,
            "string.empty": `username cannot be an empty field`,
            "any.required": `username is a required field`,
          }),
          password: Joi.string().required().messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
          }),
          nama: Joi.string().required().messages({
            "string.base": `nama should be a type of string`,
            "string.empty": `nama cannot be an empty field`,
            "any.required": `nama is a required field`,
          }),
          no_tlp: Joi.string().required().messages({
            "string.base": `no_tlp should be a type of string`,
            "string.empty": `no_tlp cannot be an empty field`,
            "any.required": `no_tlp is a required field`,
          }),
        })
        .unknown(true);

      const { error } = schema.validate(dto);

      if (error != undefined) {
        return res.status(400).json({
          status: 400,
          message: error?.details.map((e) => e.message).join(","),
          error: true,
        });
      } else {
        const [success, error] = await CreateUser.createUser(dto);

        if (error.error) {
          return res.status(error.status).json(error);
        } else {
          return res.status(success.status).json(success);
        }
      }
    }
    public async signInUser(req: Request, res: Response): Promise <any> {
        const serviceAuth = new ServiceAuth();
        const signINuserrr: signInUserr = {
            ...req.body,
        };
        const schema = Joi.object()
      .keys({
        username: Joi.string().required().messages({
            "string.base": `username should be a type of string`,
            "string.empty": `username cannot be an empty field`,
            "any.required": `username is a required field`,
          }),
          password: Joi.string().required().messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
          }),
      })
      .unknown(true);
      const { error } = schema.validate(req.body);
      if (error != undefined) {
        return res.status(400).json({
            status: 400,
            message: error?.details.map((e) => e.message).join(","),
            error : true,
        });
      } else {
        const [succes, error] = await serviceAuth.signinUser(signINuserrr);
        if (error.error){
          return res.status(error.status).json(error);
        } else {
          return res.status(succes.status).json(succes);
        }
        
      }
    
        }
}