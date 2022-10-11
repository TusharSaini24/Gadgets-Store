import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Store } from "../../../utils/Store";
import dynamic from "next/dynamic";
import Link from "next/link";

function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsCount, setCartItemCount] = useState(0);
  useEffect(() => {
    setCartItemCount(
      Number(state.cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    );
    setTotalPrice(
      Number(state.cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0))
    );
  }, [state.cart.cartItems]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col flex-wrap">
          <div className="p-2 w-9/12 pr-12">
            <div className="pl-2 w-full  flex  gap-1 relative border-1 justify-between">
              <div className="flex justify-between max-w-90 gap-2">
                <span className="text-2xl text-black">
                  Quantity : {cartItemsCount}{" "}
                </span>
                <span className="text-2xl text-black">
                  Total Price : &#x20B9;{totalPrice}{" "}
                </span>
              </div>
              <div>
                <button
                  className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                  onClick={() => {
                    if (Object.keys(state?.user).length === 0) {
                      toast("you need to logged in ");
                    }
                    if (state?.cart?.cartItems?.length === 0) {
                      toast("cart is empty");
                    } else {
                      router.push("/gadgets/shipping");
                    }
                  }}
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap -m-4">
            {state.cart.cartItems.length > 0 ? (
              state?.cart?.cartItems?.map((gadget, index) => (
                <div className="p-4 w-full" key={index}>
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <img
                        className="object-cover object-center w-full h-full block"
                        src={gadget.image}
                        alt={gadget.name}
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        {gadget.name}
                      </h2>
                      <p className="leading-relaxed text-base">
                        {gadget.description}
                        <br />
                        Blue bottle crucifix vinyl post-ironic four dollar toast
                        vegan taxidermy. Gastropub indxgo juice poutine.
                      </p>
                      <div className="flex my-2 items-center">
                        <span className="mr-3">Qty</span>
                        <div className="relative">
                          <select
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                            onChange={(e) => setQantity(e.target.value)}
                            disabled
                          >
                            <option key={gadget.quantity + 1}>
                              {gadget.quantity + 1}
                            </option>
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
                      <div className="flex mt-4 justify-between">
                        <span className="title-font font-medium text-2xl text-gray-900">
                          &#x20B9;{gadget.price * gadget.quantity}
                        </span>
                        <div className="flex gap-1 justify-center">
                          <button
                            className="flex ml-auto text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded-full mb-2"
                            onClick={() => {
                              toast.success("gadget removed");
                              dispatch({
                                type: "REMOVE_ITEM_FROM_CART",
                                payload: gadget,
                              });
                            }}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex ">
                <p className="ml-8 mt-8 text-xl text-gray-600 text-center ">
                  Cart is empty{" "}
                  <Link href={`/`}>
                    <a className="text-green-400">click here </a>
                  </Link>
                  for shopping
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
