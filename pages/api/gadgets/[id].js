import nc from "next-connect";
import { getGadget } from "../../../server/controllers/gadgetContoller";
import db from "../../../server/config/config";
const handler = nc();
db();
handler.get(getGadget);

export default handler;
