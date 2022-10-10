import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "gadget",
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          default: 0,
        },
        numReviews: {
          type: Number,
          required: true,
          defualt: 0,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        countInStock: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      // required: true,
    },
    paymentResult: {
      transacitionId: {
        type: String,
      },
      status: {
        type: Boolean,
      },
      email_address: {
        type: String,
      },
    },
    taxPrice: {
      type: Number,
      required: true,
      defualt: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliverAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const order = mongoose.models.order
  ? mongoose.models.order
  : mongoose.model("order", orderSchema);

export default order;
