import nc from "next-connect";
import { getAllGadgets } from "../../../server/controllers/gadgetContoller";
import db from "../../../server/config/config";
const handler = nc();
db();
handler.get(getAllGadgets);

export default handler;
