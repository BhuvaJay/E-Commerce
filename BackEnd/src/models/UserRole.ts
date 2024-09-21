import { DataTypes } from 'sequelize';
import { sequelizeConnection as sequelize } from '../db/sql';

export const UserRole =  sequelize.define('userRoles', {
    path: {
    type: DataTypes.STRING,
      trim: true,
    },
    method: {
      type: DataTypes.STRING,
      trim: true,
    },
    allowedRole: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);



