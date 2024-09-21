import {app} from './app';
import {config} from '../config/configFile';
import { logger } from './utils/logger';

const port = config.getPort()
app.listen(port, ():void => {
    logger.info('Server is up on port ' + port)
})
