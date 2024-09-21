const jwt = require("jsonwebtoken");
import { User } from "../models/User";
import { logger } from "../utils/logger";
import { config } from "../../config/configFile";
const JWT_SECRET = config.getJwtSecretKey();

const email = config.getEmail();
const pwd = config.getPassword();
const authentication = async function (req: any, res: any, next: any) {

  try {
    const token = req.header("Authorization").replace("Bearer", "");
    if (config.getTestMode() === true && token) {
      console.log('token', token)
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('decoded', decoded)

      if (decoded.user.email == email && decoded.user.password == pwd) {
        next();
      }
      else {
        throw new Error();
      }
      req.token = token;
    }

    else {
      const decoded = jwt.verify(token, JWT_SECRET);

      const id= parseInt(decoded._id)

      const user = await User.findOne({ where: { userId: id} });
      if (!user) {

        throw new Error();
      }

      req.token = token;
      req.user = user;
      next();
    }

  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
    logger.error(
      `401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};
export { authentication as auth };
