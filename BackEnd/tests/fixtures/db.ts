const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
import {User} from '../../src/models/user';
// require("dotenv").config();
import {config} from '../../config/configFile';
const JWT_SECRET = config.getJwtSecretKey()

const email = config.getEmail();
const pwd = config.getPassword();

const generateTokenByEmail = (email: any) => {
  return jwt.sign({ user: email }, config.getJwtSecretKey()); // process.env.JWT_SECRET)
};

// const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: 1,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    user_type_id:0,
    token: generateTokenByEmail({
        email: email,
        password: pwd,
      }),
}

const setupDatabase = async () => {
    await User.destroy({
        truncate: true
    })
    await new User(userOne).save()
}
setupDatabase()
export  {
    
    userOne,
    setupDatabase
}