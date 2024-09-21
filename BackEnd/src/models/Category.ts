import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';

export const Category = sequelize.define('Category', {
  categoryid : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  name : {
    type: DataTypes.STRING(),
    allowNull: false,
  } 
},{
  sequelize,
  tableName: 'Category',
  timestamps: false,
  indexes: [
    {
      name: 'category_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'categoryid' }
      ]
    }
  ]
})