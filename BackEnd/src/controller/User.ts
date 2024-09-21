import { Request, Response } from "express";
import bcrypt = require("bcryptjs");
import { User } from "../models/User";
import { logger } from "../utils/logger";
// import { checkAccess } from "../middleware/uservalidate";
import { sendmail } from "../emails/nodemailer";
import { setResponse } from "../common";
import { config } from "../../config/configFile";
import jwt = require("jsonwebtoken");
const ActiveDirectory = require("activedirectory2");

const email = config.getEmail();
const pwd = config.getPassword();

const configAd = {
  url: "ldap://synovergetech.com",
  baseDN: "dc=synovergetech,dc=com",
  username: "bhuvajay@synovergetech.com",
  password: "qwertyuiop[]\\1",
};
const ad = new ActiveDirectory(configAd);

const generateAuthToken = (id: any) => {
  console.log("id", id);
  return jwt.sign({ _id: id.toString() }, config.getJwtSecretKey()); // process.env.JWT_SECRET)
};

const generateTokenByEmail = (email: any) => {
  return jwt.sign({ email: email }, config.getJwtSecretKey()); // process.env.JWT_SECRET)
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, gender, email, password, age } =
      req.body;
    console.log("password", password);
    const user = await User.findOne({ where: { email } });
    console.log("req.body", req.body);
    console.log("user", user);
    if (!user) {
      console.log("user is not exists");
      const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber: parseInt(phoneNumber),
        gender,
        email,
        age,
        password: await bcrypt.hash(password, 8),
      });
      console.log("newUser", newUser);
      console.log("user is not exists 1");

      const token = generateAuthToken(newUser.dataValues.userId);
      sendmail(
        [req.body.email],
        "Welcome to Synoverge",
        `<b>Hello ${req.body.name}</b>`
      );
      logger.info(
        `201 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      setResponse(res, 200, "S", "Successfully created", { newUser, token });
    } else {
      console.log("user is exists");
      logger.info(`201 User already exists || ${email} `);
      setResponse(res, 201, "E", "User already exists");
    }
  } catch (e) {
    console.log("error in create user");
    logger.error("error in user controller", e);
    console.log("e", e);
    setResponse(res, 400, "E", "error in create user");
  }
};

// const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   // console.log([ad, username, password]);
//   try {
//     ad.findUser(username, (err: any, user: boolean) => {
//       if (err) {
//         console.log(
//           "error from finduser1------------------------------->",
//           JSON.stringify(err)
//         );
//         throw err;
//       } else if (!user) {
//         res.status(401).json({ message: "User not found" });
//         console.log("inside Else If");
//       } else {
//         console.log("Here");
//         ad.authenticate(username, password, (err: any, validAuth: boolean) => {
//           console.log("inside Else ");
//           if (err) {
//             if (err.name === "InvalidCredentialsError") {
//               res.status(401).send({ message: "Wrong Password!" });
//             } else {
//               res.status(401).send({ message: "Authentication failed!" });
//             }
//           }

//           if (validAuth) {
//             console.log("User authenticated successfully!");
//             res.status(200).send({ message: "Login successful!" });
//           } 
//           // else {
//           //   console.log("Authentication failed!");
//           //   res.status(401).send({ message: "Authentication failed!" });
//           // }
//         });
//       }
//     });
//   } catch (e) {
//     setResponse(res, 500, "E", "Unable to login in AD", { e });
//   }
// };

const login = async (req: Request, res: Response) => {

  try {
//     if (config.getTestMode() === true) {
// // console.log('config.getTestMode()', config.getTestMode())
//       const token = await generateTokenByEmail({
//         email: email,
//         password: pwd
//       })
//       setResponse(res, 200, 'S', 'login success', { token })
//     }

//    else {
      const user = await User.findOne({ where: { email: req.body.email } })
      console.log('user', user.dataValues)
      if (!user) {
        return setResponse(res, 400, 'E', 'User Not Found');
      }

      const isMatch = await bcrypt.compare(req.body.password, user.dataValues.password)
      console.log('ismatch', isMatch)
      if (!isMatch) {
        return setResponse(res, 400, 'E', 'Wrong password');
      }

      const token = await generateAuthToken(user.dataValues.userId)
      setResponse(res, 200, 'S', 'login success', { user, token })
   // }

  } catch (e) {
    setResponse(res, 500, 'E', 'Unable to login', { e });
  }
}

const getUserDetails = async (req: any, res: Response) => {
  //,checkAccess
  console.log("req.user", req.user);
  const user = await User.findOne({ where: { userId: req.user.userId } });
  logger.info(
    `201 || successfully get user - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  setResponse(res, 200, "S", "Successfully get user detail", { user });
};

//For Getting a single user detail
const getUserDetail = async (req: any, res: Response) => {
  //,checkAccess
  const user: any = req.user;
  logger.info(
    `201 || successfully get user - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  return setResponse(res, 200, "S", "Successfully get user detail", { user });
};

//only Admin can get all user
const getAllUserDetails = async (req: any, res: Response) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).send();
    }
    logger.info(
      `201 || successfully get All user - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    setResponse(res, 200, "S", "Successfully get all user", { users });
  } catch (e) {
    setResponse(res, 500, "E");
  }
};

const updateUser = async (req: any, res: Response) => {
  //,checkAccess
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "phoneNumber",
    "gender",
    "email",
    "password",
    "age",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.update(
      { ...req.body, MODIFIED_ON: new Date() },
      { where: { userId: req.user.userId } }
    );
    setResponse(res, 200, "S", "Successfully update user");
  } catch (e) {
    res.status(400).send(e);
    logger.error(
      `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const deleteUser = async (req: any, res: Response) => {
  //,checkAccess
  try {
    // console.log(req.body.us,"<---------------")
    await User.destroy({ where: { userId: req.user.userId } });

    setResponse(res, 200, "S", "Successfully delete user");
  } catch (e) {
    console.log("err", e);
    res.status(500).send();
  }
};

const controller = {
  createUser,
  login,
  getUserDetails,
  getAllUserDetails,
  updateUser,
  getUserDetail,
  deleteUser,
};

export { controller as userController };
