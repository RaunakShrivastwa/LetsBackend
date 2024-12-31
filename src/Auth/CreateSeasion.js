import JwtToken from "jsonwebtoken";
import User from "../schema/User/User.js";
import EctDct from "../config/Encryption&Decryption/EctDct.js";
import dotenv from "dotenv";
import { LocalStorage } from "node-localstorage";
dotenv.config();
const { decrypt } = EctDct;
const localStorage = new LocalStorage("./scratch");

class CreateSession {
  createToken = async (req, res) => {
    try {
      let user = await User.findOne({ userEmail: req.body.userEmail });
      // req.locals = user;
      if (
        !user ||
        decrypt(user.userPassword, process.env.KEY) != req.body.userPassword
      ) {
        return res.status(403).json({ Message: "Invalide Credential" });
      }
      if (!user.token) {
        const token = JwtToken.sign(user.toJSON(), process.env.JWT_KEY, {
          expiresIn: 10000000,
        });
        await User.findByIdAndUpdate(user._id, { token });
        return res.status(200).json({ token });
      }
      return res
        .status(400)
        .json({ Message: "Your Current Session Running, Logout First" });
    } catch (err) {
      return res.json({ Error: err });
    }
  };

  logout = async (req, res) => {
    try {
      return res.json(
        await User.findOneAndUpdate(
          { token: req.header("Authorization") },
          { token: null },
          { new: true }
        )
      );
    } catch (err) {
      return res.status(400).json(err);
    }
  };
}

export default new CreateSession();
