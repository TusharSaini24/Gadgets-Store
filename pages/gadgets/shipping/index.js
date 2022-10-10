import { useContext, useEffect, useState } from "react";
import { Store } from "../../../utils/Store";
import CheckOut from "../../../components/stripe/Checkout";
import axios from "axios";
import { useRouter } from "next/router";

const ShippingScreen = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsCount, setCartItemCount] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);

  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    setTaxPrice(
      Number(
        state.cart.cartItems.reduce(
          (a, c) => a + ((c.price * 10) / 100) * c.quantity,
          0
        )
      )
    );

    setCartItemCount(
      Number(state.cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    );
    setTotalPrice(
      Number(state.cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0))
    );
  }, [state.cart.cartItems]);

  const handlePaymentResult = (object) => {
    console.log(object);
    setPaymentResult(object);
  };
  console.log("state item ", state.cart);

  const handlePlaceOrder = async () => {
    let orderItems = state.cart.cartItems;
    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };
    const paymentMethod = paymentMethod;
    const paymentResult = paymentResult;
    // const paymentResult = {
    //   transacitionId: "tok_1Lr1t9AxBrXJs2UIeNJ2wvtZ",
    //   email: "sainitushar239@gmail.com",
    //   status: true,
    // };

    const shippingPrice = 100;

    const isPaid = true;
    try {
      const res = await axios.post("http://localhost:3000/api/gadgets/order", {
        user: state.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        taxPrice: taxPrice,
        shippingPrice,
        totalPrice: totalPrice,
        isPaid,
      });
      console.log("before");
      console.log("order Items", orderItems);
      dispatch({ type: "CLEAR_CART" });
      //   router.push("/gadgets/orderhistory");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="relative container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Shipping | Payment | Place Gadgets
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-col flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Postal code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-600">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="flex my-2 items-center">
              <span className="mr-3">Payment Method</span>
              <div className="relative">
                <select
                  className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  name="paymentMethod"
                  value={paymentMethod}
                >
                  <option value="cash on delivery">Cash on delivery</option>
                  <option value="stripe">Stripe</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="pl-2 flex flex-col gap-1 relative border-2 ">
                <span>quantity : {cartItemsCount}</span>
                <span>Shipping price : &#x20B9; 100</span>
                <span>Tax price : &#x20B9; {taxPrice} </span>
                <span>Total Price : &#x20B9;{totalPrice + taxPrice + 100}</span>
              </div>
            </div>
            <div className="p-2 w-full flex  items-center gap-2">
              {paymentMethod && paymentMethod === "stripe" && (
                <CheckOut
                  subTotal={totalPrice + taxPrice + 100}
                  handlePaymentResult={handlePaymentResult}
                />
              )}

              <button
                className=" flex  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                onClick={handlePlaceOrder}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingScreen;
