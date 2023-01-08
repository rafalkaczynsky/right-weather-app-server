import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validation");

    const token = req.headers.authorization?.split(" ")[1];

    if(token){
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if(error){
                return res.status(404).json({
                    msg: error.message,
                    error
                })
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });   
    }else {
        return res.status(401).json({
            message: 'Unauthorised'
        })
    }
};

export default extractJWT;