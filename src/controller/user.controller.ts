import { ServiceAuth } from "../services/auth.services";
import { Request, Response } from "express";
import { CreateAdmin } from "../models/user.dto";
import Joi from "joi";

export class userController {
    public async adminCreate(req: Request, res: Response):Promise <any> {
        const userServices = new ServiceAuth();
        const dto: CreateAdmin = req.body;
    }
}