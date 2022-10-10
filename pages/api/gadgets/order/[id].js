import nc from "next-connect";
import db from "../../../../server/config/config";
import { getOrderById } from "../../../../server/controllers/orderController";

const handler = nc();
db();

handler.get(getOrderById);

export default handler;
