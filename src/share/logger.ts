import winston = require('winston');
// import { Config } from '../config';

const transports = [new winston.transports.Console()];
let level = 'info';

// if (Config.ENV === 'test') {
//     transports.length = 0;
//     level = 'error';
// }

const logger = winston.createLogger({
    transports,
    level
})


export {
    logger
}