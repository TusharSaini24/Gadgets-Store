import nc from "next-connect";
import db from "../../../../server/config/config";
import { protect } from "../../../../server/middleware/authMiddleware";
import { getAllOrder } from "../../../../server/controllers/adminControllers";
const handler = nc();
db();

handler.use(protect).get(getAllOrder);
// handler.get(getAllOrder);
export default handler;
