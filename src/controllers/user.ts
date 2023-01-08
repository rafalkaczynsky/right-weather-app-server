import { NextFunction, Request, Response } from "express";

import logging from '../config/logging';
import bcryptjs from 'bcryptjs';

//Help keep track of loggs
const NAMESPACE = "User";

// Protecing route that we need for testing if user is authenticating properly
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "User has been authorised");

    return res.status(200).json({
        msg: "Authorised"
    });
};

// Creating user and storing user in database
const register = (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    //Salting and hashing unecrypted password 
    bcryptjs.hash(password, 10, (error, hash) => {
        if(error){
            return res.status(500).json({
                msg: error.message,
                error: error,
            })
        }

        //TODO If no error insert user to database
    })
};

//Login a user and returning token and user object
const login = (req: Request, res: Response, next: NextFunction) => {};

// Returning all users for testing puproses
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default {
    validateToken,
    register,
    login,
    getAllUsers,
};