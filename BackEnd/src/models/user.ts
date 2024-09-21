import { sequelizeConnection as sequelize } from "../db/sql";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "Users",
  {
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      // default: 0,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING(255),
      required: true,
      minlength: 8,
      trim: true,
    },
    gender: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    user_type_id: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    avatar: {
      type: DataTypes.BLOB,
    },
  },
  {
    timestamps: true,
  },
  {
    sequelize,
    tableName: "User",
    timestamps: false,
    indexes: [
      {
        name: "user_primary_key",
        unique: true,
        using: "BTREE",
        fields: [{ name: "userId" }],
      },
    ],
  }
);
