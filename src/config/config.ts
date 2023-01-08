import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'rightweatherdb';
const MYSQL_USER = process.env.MYSQL_HOST || 'user';
const MYSQL_PASS = process.env.MYSQL_HOST || 'password1';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600; // in seconds (default 1h)
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'rafalkaczynskyorganisation';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'encryptedsecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;