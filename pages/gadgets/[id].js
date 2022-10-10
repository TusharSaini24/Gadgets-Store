import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Store } from "../../utils/Store";
const baseUrl = process.env.BASE_URL;

export async function getStaticPaths() {
  const res = await axios.get(baseUrl + "/api/gadgets");
  const gadgets = res.data.data;
  const paths = gadgets.map((g) => {
    return {
      params: { id: g._id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const id = context.params.id;

  const getGadget = await axios.get(baseUrl + "/api/gadgets/" + id);

  return {
    props: { propGadget: getGadget.data.data },
  };
}

const Gadget = (props) => {
  const { propGadget } = props;
  const { state, dispatch } = useContext(Store);
  const [quantity, setQantity] = useState(1);

  const addToCartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...propGadget, quantity: Number(quantity) },
    });
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <Link href={"/"}>
          <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded mb-2">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <button
              onClick={() => {
                console.log("props : ", props);
              }}
            >
              click to see props
            </button>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {propGadget?.name ?? "nameNotDefined"}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              {propGadget?.description ?? "descriptionNotDefined"}
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow text-green-500 border-b-2 border-green-500 py-2 text-lg px-1">
                Description
              </a>
              {/* <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Reviews
              </a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                Details
              </a> */}
            </div>
            <p className="leading-relaxed mb-4">
              {/* {propGadget.description} */}
              <br />
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean.
            </p>

            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Quantity</span>
              <span className="ml-auto text-gray-900">
                {/* {propGadget.countInStock} */}
              </span>
            </div>
            <div className="flex my-2 items-center">
              <span className="mr-3">Qty</span>
              <div className="relative">
                <select
                  className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  onChange={(e) => setQantity(e.target.value)}
                >
                  {/* {[...Array(propGadget.countInStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))} */}
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
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {/* &#x20B9; {propGadget.price} */}
              </span>
              {/* <Link href={`gadgets/cart/${propGadget._id}`}> */}
              <button
                className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
              {/* </Link> */}
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
          {/* <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={propGadget.image}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Gadget;
