
//db.js
import { createPool} from 'mariadb';
// import logger from './logger';

let conn;
let rec = 0;

export const getConnection = async () => {
    if (conn !== undefined) {
        return conn;
    }
    try {
        rec++;
        if (rec > 5) {
            return conn;
        }
        // console.log('port' , process.env.DB_PORT);
        
        // const password = process.env.DB_PASSWORD;
        // const host = process.env.DB_HOST;
        // const port = Number(process.env.DB_PORT);
        // const database = process.env.DB_NAME;
        // const user = process.env.DB_USER;

        const password = 'admin@123';
        const host = 'localhost';
        const port = '3308';
        const database ='act_tms';
        const user = 'root';
        // if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
        //     password = 'admin123';
        //     host= 'localhost';
        //     port = 3307;
        // } else {
        //     password = 'tJwkHQbWJXwgCngTXTKr';
        //     host= 'mariadb-1.c1yayegiwvkd.us-east-1.rds.amazonaws.com';
        //     console.log('Production');
        //     port = 3306;
        // }
        const _conn = createPool({
            user,
            // host: '139.59.61.44',
            host,
            database,
            password,
            port,
            connectionLimit: 10, 
            connectTimeout: 10000, 
            acquireTimeout: 10000, 
            dateStrings:true
        });
        // logger.info('Connected to database');
        conn = _conn;
        rec = 0;
        return conn;
    } catch (err) {
        // logger.error(`Error connecting to database ${err}`);
        return getConnection();
    }
};