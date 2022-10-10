import nc from "next-connect";
import {
  getAndroidPhones,
  getLaptops,
} from "../../../../server/controllers/gadgetContoller";
import db from "../../../../server/config/config";
const handler = nc();
db();

handler.get(getAndroidPhones);
export default handler;
