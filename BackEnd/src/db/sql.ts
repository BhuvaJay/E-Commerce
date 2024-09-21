const Sequelize = require('sequelize')
import { config } from '../../config/configFile';

const dbName = config.getDbName();
const dbUser = config.getDbUser();
const dbPwd = config.getDbPwd();
const dbHost = config.getDbHost();
const dbPort = config.getDbPort();

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPwd,
  {
    dialect: 'postgres',
    host: dbHost,
    port: dbPort,
    logging: false
  });


  


