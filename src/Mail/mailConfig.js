import nodemailer from "nodemailer";


const transpoter = nodemailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: "puse476@gmail.com",
    pass: "rdfviwvmdsvodvtl",
  },
});

export default {transpoter};
