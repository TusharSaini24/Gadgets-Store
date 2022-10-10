import nc from "next-connect";
import { getLaptops } from "../../../../server/controllers/gadgetContoller";
import db from "../../../../server/config/config";
const handler = nc();
db();

handler.get(getLaptops);
export default handler;
