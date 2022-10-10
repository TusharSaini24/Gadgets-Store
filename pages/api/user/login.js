import nc from "next-connect";
import { loginUser } from "../../../server/controllers/UserController";
import db from "../../../server/config/config";
const handler = nc();
db();

handler.post(loginUser);

export default handler;
