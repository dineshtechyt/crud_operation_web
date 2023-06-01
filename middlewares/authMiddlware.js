import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.uId = decode._id;
    next();
  } catch (error) {
    console.log(error);
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.uId);
    if (user.isAdmin === false) {
      return res.status(401).json({
        success: false,
        message: "unathorized access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middleware",
    });
  }
};
  

