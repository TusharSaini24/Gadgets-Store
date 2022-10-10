// import { gadgets } from "../../data/gadgets";
import { cloneElement } from "react";
import gadgetModel from "../models/gadgetModel";

const getAllGadgets = async (req, res) => {
  try {
    const gadgets = await gadgetModel.find();
    res
      .status(200)
      .json({ success: true, message: "data fetched ", data: gadgets });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};

const createGadgets = async (req, res) => {
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

const getGadget = async (req, res) => {
  try {
    const gadget = await gadgetModel.findById(req.query.id);

    res
      .status(200)
      .json({ success: true, message: "data fetched", data: gadget });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};

const getLaptops = async (req, res) => {
  try {
    const gadget = await gadgetModel.find({ category: "Laptops" });

    res
      .status(200)
      .json({ success: true, message: "data fetched", data: gadget });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};
const getGuitars = async (req, res) => {
  try {
    const gadget = await gadgetModel.find({ category: "Guitars" });

    res
      .status(200)
      .json({ success: true, message: "data fetched", data: gadget });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};
const getAndroidPhones = async (req, res) => {
  try {
    const gadget = await gadgetModel.find({ category: "Android Phones" });

    res
      .status(200)
      .json({ success: true, message: "data fetched", data: gadget });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: err });
  }
};
export {
  getAllGadgets,
  createGadgets,
  getGadget,
  getLaptops,
  getGuitars,
  getAndroidPhones,
};
