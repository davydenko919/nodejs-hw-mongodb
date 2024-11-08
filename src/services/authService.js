import { User } from "../db/models/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export async function registerUser(payload){
   const user = await User.findOne({email: payload.email});
   if (user != null){
    throw createHttpError(409, "Email is already in use");
   }

   payload.password = await bcrypt.hash(payload.password, 10);

   return User.create(payload);
};


export async function loginUser(email, password) {
   const user = await User.findOne({ email });
 
   if (user === null) {
     // throw createHttpError(404, "User not found");
     throw createHttpError(401, 'Email or password is incorrect');
   }
 
   const isMatch = await bcrypt.compare(password, user.password);
 
   if (isMatch !== true) {
     // throw createHttpError(401, "Unauthorized");
     throw createHttpError(401, 'Email or password is incorrect');
   }
}