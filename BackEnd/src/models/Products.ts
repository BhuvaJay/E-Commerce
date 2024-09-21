import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';
import {Category} from './Category';  

export const Products = sequelize.define('Products', {
  productId : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  name : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  categoryId : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Category',
      key: 'categoryid'
    }
  },  
  price : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  image : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  rating : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  discount : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  quantity : {
    type: DataTypes.INTEGER,
    allowNull: false,
  } 
},{
  sequelize,
  tableName: 'Products',
  timestamps: false,
  indexes: [
    {
      name: 'products_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'productId' }
      ]
    },
    {
      name: 'FK_PRODUCTS_CATEGORYID',        
      using: 'BTREE',
      fields: [
        { name: 'categoryId' }
      ]
    }
  ]
})
Category.hasOne(Products, {
  foreignKey: 'categoryId',
  sourceKey: ''
})
  
Products.belongsTo(Category, {
  foreignKey: 'categoryId',
  sourceKey: ''
})
