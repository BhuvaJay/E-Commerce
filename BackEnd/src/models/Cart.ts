import { sequelizeConnection as sequelize} from '../db/sql'
import {DataTypes} from 'sequelize';
import {User} from './User';  

export const Cart = sequelize.define('Cart', {
  id : {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },  
  productId : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  name : {
    type: DataTypes.STRING(),
    allowNull: false,
  },  
  categoryId : {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    type: DataTypes.FLOAT,
    allowNull: false,
  },  
  discount : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  quantity : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  
  userid : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
  } 
},{
  sequelize,
  tableName: 'Cart',
  timestamps: false,
  indexes: [
    {
      name: 'cart_primary_key',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' }
      ]
    },
    {
      name: 'FK_CART_USERID',        
      using: 'BTREE',
      fields: [
        { name: 'userid' }
      ]
    }
  ]
})
User.hasOne(Cart, {
  foreignKey: 'userid',
  sourceKey: 'userId'
})
  
Cart.belongsTo(User, {
  foreignKey: 'userid',
  sourceKey: 'userId'
})

