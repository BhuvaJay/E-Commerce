const nodemailer = require("nodemailer");
import { logger } from "../utils/logger";


const sendmail = async (to: any, subject: any, html: any) => {
  //async function sendmail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "stuart.littel90@ethereal.email",
      pass: "augkg3NkR6RAH9xqUK",
    },
  });


  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "stuart.littel90@ethereal.email", // sender address
      to: to.join(","), // list of receivers
      subject,
      html,
    });
    return info;
    
  } catch (error: any) {
    logger.error(error.response.body + "error in sending mail");
  }
};
export { sendmail as sendmail };
