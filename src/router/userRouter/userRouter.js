import express from "express";
import user from "../../controller/userController/userController.js";
import verifyToken from "../../Auth/Verifytoken.js";
const {
  deleteUser,
  fetchAlluser,
  fetchUser,
  resendOTP,
  updateUser,
  userSignUp,
  varifyOTP,
} = user;
const router = express();
router.post("/api/register/data", userSignUp);
router.get("/api/all/data", verifyToken, fetchAlluser);
router.post("/api/user/otp/varify", varifyOTP);
router.get("/api/user/otp/resend", resendOTP);
router.get("/api/user/fetch/:id", verifyToken, fetchUser);

export default router;
