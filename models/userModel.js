import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "true",
  },
  address: {
    type: String,
    required: "true",
  },
  email: {
    type: String,
    required: "true",
  },
  password: {
    type: String,
    required: "true",
  },
  answer: {
    type: String,
    required: "true",
  },
  isAdmin: {
    type: Boolean,
    default: "false",
  },
});

export default mongoose.model("User", userSchema);
