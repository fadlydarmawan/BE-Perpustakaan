import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 



dotenv.config();
export class middleware {   

public async authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split("")[1];

    if (token == null){
        return res.status(401).json({
            message: "token Not Found",
        });
    }
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, result)=> {
        if (err) {
            return res.status (401).json ({
                message: "User Unauthorized", 
            });
        } else {next(); 

        }
    });
}
};