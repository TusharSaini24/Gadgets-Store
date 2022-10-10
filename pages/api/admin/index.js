import nc from "next-connect";
import db from "../../../server/config/config";
import { adminLogin } from "../../../server/controllers/adminControllers";
const handler = nc();
db();

handler.post(adminLogin);

export default handler;
