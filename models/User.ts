import { Schema, Model, model } from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

interface IUser {
  username: string;
  password: string;
  avatar?: string;
  admin?: boolean;
}

const userSchema: any = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT!));
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function (): string {
  // this = referes to the user = all fields
  // this.toJSON() = to convert to json object
  // or {user: this}
  // or {username: this.username}
  const token = jwt.sign(
    { username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3600s",
    }
  );
  return token;
};

module.exports = model("User", userSchema);
