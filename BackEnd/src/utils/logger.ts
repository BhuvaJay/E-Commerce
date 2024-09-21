import winston from 'winston';
import moment = require('moment');
import { config } from '../../config/configFile';

const logsBasePath = `logs/${config.getEnvironment()}`;
const logStartDateTime = moment(new Date()).format('YYYY-MM-DD_HH-mm-ss');

const serverLogFileName = getLogFileName('server');

function getLogFileName (fileSuffix: string): string {
  return `${logsBasePath}/${logStartDateTime}-${fileSuffix}.log`;
}


const addAppEnvFormat = winston.format(info => {
  info.appEnv = config.getEnvironment();
  return info;
});


const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    addAppEnvFormat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: serverLogFileName })
  ]
});

export { logger }