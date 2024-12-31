import User from "../../schema/User/User.js";
import { v2 as cloudinary } from "cloudinary";
import requestBody from "../../config/formData/formData.js";
import EctDct from "../../config/Encryption&Decryption/EctDct.js";
import dotenv from "dotenv";
import Mail from "../../Mail/sendMail.js";
import { LocalStorage } from "node-localstorage";
dotenv.config();

const { encrypt, isValidPassword } = EctDct;
const { sendMail } = Mail;
const localStorage = new LocalStorage("./scratch");

class userController {
  // for the register user
  userSignUp = async (req, res) => {
    const fields = req.body;
    if (!isValidPassword(fields.userPassword)) {
      return res.status(400).json({
        error:
          "Password must have at least one letter (uppercase or lowercase), one digit, and one special symbol",
      });
    }
    fields.userPassword = encrypt(fields.userPassword, process.env.KEY);
    try {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      fields.OTP = randomNumber;
      fields.time = new Date().getMinutes();
      const exist = localStorage.getItem("userInfo");
      if (exist) {
        localStorage.removeItem("userInfo");
      }
      const userJsonString = JSON.stringify(fields);
      localStorage.setItem("userInfo", userJsonString);
      sendMail(fields);
      return res.json({
        User: " 6 degit OTP Send over Your Mail, Cheak and Varify before OTP Expire",
      });
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  varifyOTP = async (req, res) => {
    const OTP = req.body.OTP;
    const user1 = localStorage.getItem("userInfo");
    const user = JSON.parse(user1);
    const date = new Date();
    let current = date.getMinutes();
    user.profileId = req.body.public_id;
    user.profileSecure = req.body.secure_url;
    user.profile = req.body.url;
    if (Math.abs(current - user.time) <= 5) {
      if (user.OTP == OTP) {
        delete user.OTP;
        const exist = await User.findOne({ userEmail: user.userEmail });
        if (exist) {
          return res.status(501).json({ error: "Email Alredy Taken" });
        }
        const userData = await User.create(user);
        return res.json({ Varify: "Account Varified", Message: userData });
      }
      return res.status(500).json({ error: "OTP did't Matched" });
    } else {
      return res.status(403).json({ error: "OTP Expired" });
    }
  };

  resendOTP = async (req, res) => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const user1 = localStorage.getItem("userInfo");
    const user = JSON.parse(user1);
    localStorage.removeItem("userInfo");
    user.OTP = randomNumber;
    localStorage.setItem("userInfo", JSON.stringify(user));
    sendMail(user);
    return res.json({
      User: " 6 degit OTP Send over Your Mail, Cheak and Varify before OTP Expire",
    });
  };

  fetchAlluser = async (req, res) => {
    try {
      return res.status(200).json(await User.find({}));
    } catch (err) {
      return res.status(501).json(err);
    }
  };

  fetchUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("pastProjects")
        .populate("currentProjects");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  deleteUser = async (req, res) => {};

  updateUser = async (req, res) => {};

  //
}

export default new userController();
