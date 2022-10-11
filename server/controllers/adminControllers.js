import userModel from "../models/userModel";
import orderModel from "../models/orderModel";
import gadgetModel from "../models/gadgetModel";
import { generateToken } from "../utils/generateToken";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExist = await userModel.findOne({ email: email });

    if (adminExist.isAdmin && (await adminExist.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: "admin logged in successfully",
        data: {
          _id: adminExist._id,
          name: adminExist.name,
          email: adminExist.email,
          isAdmin: adminExist.isAdmin,
          token: generateToken(adminExist._id),
        },
      });
    } else {
      res.status(200).json({
        success: false,
        message: "not admin",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

// order controller

const getAllOrder = async (req, res) => {
  try {
    const order = await orderModel.find();
    if (order) {
      res
        .status(200)
        .json({ success: true, message: "order fetch ", data: order });
    } else {
      res.status(401).json({ success: true, message: "order not found " });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

// gadgets controller

const createGadget = async (req, res) => {
  try {
    const gadget = gadgetModel.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "data inserted", data: gadget });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};

export { adminLogin, getAllOrder, createGadget };
