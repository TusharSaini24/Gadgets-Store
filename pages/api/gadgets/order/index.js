import nc from "next-connect";
import db from "../../../../server/config/config";
import {
  createOrder,
  getOrderById,
} from "../../../../server/controllers/orderController";
import { protect } from "../../../../server/middleware/authMiddleware";
const handler = nc();
db();

handler.post(createOrder);

export default handler;
