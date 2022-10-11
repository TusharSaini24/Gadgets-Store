import nc from "next-connect";
import db from "../../../../server/config/config";

import { getAllOrder } from "../../../../server/controllers/adminControllers";
const handler = nc();
db();

handler.get(getAllOrder);
export default handler;
