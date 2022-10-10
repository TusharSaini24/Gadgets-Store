import orderModel from "../models/orderModel";

const createOrder = async (req, res) => {
  try {
    console.log("req.body ", req.body);
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ success: false, message: "no order found" });
    } else {
      const order = new orderModel({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
      });

      const createOrder = await order.save();
      res
        .status(200)
        .json({ success: true, message: "order created ", data: createOrder });
    }
  } catch (err) {
    console.log("error", err.stack);
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

const getOrderById = async (req, res) => {
  console.log("first");
  console.log(req.query.id);
  try {
    const order = await orderModel.find({ user: req.query.id });
    if (order) {
      res
        .status(200)
        .json({ success: true, message: "order fetch ", data: order });
    } else {
      res.status(401).json({ success: true, message: "order not found " });
    }
  } catch (err) {
    console.log("error", err.stack);
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

export { createOrder, getOrderById };
