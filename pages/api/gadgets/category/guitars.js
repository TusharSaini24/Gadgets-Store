import nc from "next-connect";
import {
  getGuitars,
  getLaptops,
} from "../../../../server/controllers/gadgetContoller";
import db from "../../../../server/config/config";
const handler = nc();
db();

handler.get(getGuitars);
export default handler;
