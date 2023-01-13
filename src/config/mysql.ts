import mysql from 'mysql';
import config from './config' ;
import logging from './logging';

const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};

const Connect = async () => 
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((err) => {

            logging.error('CONNECTION ERROR', err?.message || 'error is null' , err);
            if(err){
                reject(err);
                return;
            }

            resolve(connection);
        });
    });

const Query = async <T>(connection: mysql.Connection, query: string) => 
    new Promise<T>((resolve, reject) => {
        connection.query(query, connection, (err, result) =>{
            if(err) {
                reject(err);
            }

            resolve(result);
            connection.end();
        });
    });


export {
    Connect,
    Query
};