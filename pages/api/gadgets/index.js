import nc from "next-connect";
import {
  createGadgets,
  getAllGadgets,
} from "../../../server/controllers/gadgetContoller";
import db from "../../../server/config/config";
const handler = nc();
db();
handler.get(getAllGadgets);
handler.post(createGadgets);
export default handler;
