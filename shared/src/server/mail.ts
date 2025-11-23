import nodemailer from "nodemailer"
import {config} from "./config.js";


const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: config.SENDER_EMAIL,
    pass: config.EMAIL_PASSWORD, 
  },
});


export const sendMail = async({to,subject,html}:{
    to : string,
    subject : string ,
    html : string
}) => {
    await transporter.sendMail({
    from: config.SENDER_EMAIL,
    to,
    subject,
    html
  });
}