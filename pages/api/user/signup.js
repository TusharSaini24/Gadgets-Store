import nc from "next-connect";
import {
  loginUser,
  registerUser,
} from "../../../server/controllers/UserController";
import db from "../../../server/config/config";
const handler = nc();
db();
handler.post(registerUser);

export default handler;
