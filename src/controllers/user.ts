import { NextFunction, Request, Response } from "express";
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from "../functions/signJWT";
import IUser from "../interfaces/user";
import { Connect, Query } from "../config/mysql";
import IMySQLResult from "../interfaces/result";


//Help keep track of loggs
const NAMESPACE = "User";

// Protected route that we need for testing if user is authenticating properly
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "User has been authorised");

    return res.status(200).json({
        msg: "Authorised"
    });
};

// Creating user and storing user in database
const register = (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, username, password} = req.body;


    //Salting and hashing unecrypted password 
    bcryptjs.hash(password, 10, (error, hash) => {
        if(error){
            return res.status(505).json({
                msg: error.message,
                error: error,
            })
        }

        let query = `INSERT INTO users (firstName, lastName, username, password) VALUES ("${firstName}", "${lastName}", "${username}", "${hash}")`;
        Connect().then(connection => {
            Query(connection, query).then((result) => {
                // logging.info(NAMESPACE, `User with id ${result.insertId} inserted`);
                return res.status(201).json(result);
            }).catch( err => {
                logging.error(NAMESPACE, err.message, err);
    
                return res.status(500).json({
                    message: err.message,
                    err
                });
            });
        }).catch( err => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(505).json({
                message: err.message,
                err
            });
        });
    });
};

//Login a user and returning token and user object
const login = (req: Request, res: Response, next: NextFunction) => {
    let {username, password} = req.body;
    let query = `SELECT * FROM users WHERE username = '${username}'`;

    Connect().then((connection) => {
        Query<IUser[]>(connection, query).then((users) => {
            bcryptjs.compare(password, users[0].password, (error, result) => {
                if(error){
                    return res.status(401).json({
                        message: "Incorrect password"
                    });
                } else if (result){
                    signJWT(users[0], (_error, token) => {
                        if(_error){
                            return res.status(401).json({
                                message: "Cant sign JWT",
                                error: _error
                            });
                        } else if (token)
                        {
                            return res.status(200).json({
                                message: "Authorised",
                                token: token,
                                user: users[0]
                            });
                        }        
                    })
                }
            });
        }).catch( err => {
            logging.error(NAMESPACE, err.message, err);

            return res.status(500).json({
                message: err.message,
                err
            });
        });
    }).catch( err => {
        logging.error(NAMESPACE, err.message, err);

        return res.status(500).json({
            message: err.message,
            err
        });
    });
};

// Returning all users for testing puproses
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {

    let query = `SELECT username FROM users`;

    Connect()
        .then((connection) => {
            Query<IUser[]>(connection, query)
                .then((users) => {
                    return res.status(200).json({
                        users,
                        count: users.length
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    validateToken,
    register,
    login,
    getAllUsers,
};