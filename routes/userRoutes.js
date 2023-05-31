import express from "express";
import {
  getSingleUserController,
  loginController,
  registrationController,
  updateUserController,
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";
import {
  createDUserController,
  deleteDUserController,
  getAllDUserController,
  getSingleDUserController,
  updateDUserController,
} from "../controllers/demoUserController.js";

export const urouter = express.Router();

//----------------this is for user access----------------
urouter.post("/registeration", registrationController);
urouter.post("/login", loginController);
urouter.get("/getSingleUser/:id", getSingleUserController);
urouter.put("/updateUser/:id", requireSignIn, updateUserController);

//------------this is for create update delete and fetching apis-----------------

urouter.post("/createduser", requireSignIn, createDUserController);
urouter.put("/updateduser/:id", requireSignIn, updateDUserController);
urouter.delete("/deleteduser/:id", requireSignIn, deleteDUserController);
urouter.get("/fetchall", requireSignIn, getAllDUserController);
urouter.get("/fetsingle/:id", requireSignIn, getSingleDUserController);


//------------this is the search filter and pagination part-----------//


