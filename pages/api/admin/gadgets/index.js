import nc from "next-connect";
import db from "../../../../server/config/config";
import { createGadget } from "../../../../server/controllers/adminControllers";

const handler = nc();
db();

handler.post(createGadget);
export default handler;
