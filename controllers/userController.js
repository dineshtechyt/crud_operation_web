import Jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registrationController = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password, address, answer } = req.body;
    if (!name || !email || !password || !address || !answer) {
      return res.status(404).send({
        success: "false",
        message: "something went wrong",
      });
    }
    const checkEmail = await userModel.findOne({ email });
    // console.log(checkEmail)
    if (checkEmail) {
      return res.status(400).send({
        success: false,
        message: " your email is already exist",
      });
    }
    const hashedPassword = await hashPassword(password);

    const data = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      answer,
    });
    data.save();
    res.status(200).send({
      success: "true",
      message: "registration successfully done",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "something went wrong in registration",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        success: "false",
        message: "enter valid details",
      });
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      return res.status(404).send({
        success: "false",
        message: "invalid details",
      });
    }
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: "true",
      message: "successfully sign in done ",
      user,
      token,
    });
  } catch (error) {
    res.status(404).send({
      success: "false",
      message: "sorry something went wrong",
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { name, password, address, answer } = req.body;
    const user = await userModel.findById({ _id: req.params.id });
    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        address,
        answer,
        password: hashedPassword,
      },
      {
        new: "true",
      }
    );
    // console.log(updatedUser)
    res.status(200).send({
      success: "true",
      message: "successfully updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: "false",
      message: "something went wrong in update",
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const dUser = await userModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({
      success: "true",
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).snend({
      success: "false",
      message: "something is wrong in deleting",
    });
  }
};

export const getSingleUserController = async (req, res) => {
  try {
    const dUser = await userModel.findById({ _id: req.params.id });
    // console.log(req.params.id)
    res.status(200).send({
      success: "true",
      message: "user get successfully",
      dUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "something is wrong in fetching data",
    });
  }
};
