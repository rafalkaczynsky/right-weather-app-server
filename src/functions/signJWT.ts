import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = "Auth";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    const time = new Date().getTime();
    const expireTime = time + Number(config.server.token.expireTime) * 1000;
    const expireTimeInMinutes = expireTime / 1000 * 60;

    logging.info(NAMESPACE, `Signing token for ${user.username}`);

    try {
        jwt.sign({
            username: user.username
        },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: "HS256",
            expiresIn: `${expireTimeInMinutes}m`
        },
        (error, token) => {
            if(error){
                callback(error, null);
            } else if(token){
                callback(null, token);
            }
        })
    } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;