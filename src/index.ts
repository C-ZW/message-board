import http from 'http';

import app from './app';
import { logger } from './share/logger'

http.createServer(app).listen(8080, () => {
    logger.info('server start')
});