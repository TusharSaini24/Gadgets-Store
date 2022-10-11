import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { gadgets } from "../../data/gadgets";
import { Store } from "../../utils/Store";
import dynamic from "next/dynamic";
const OrderHistoryScreen = () => {
  const { state, dispatch } = useContext(Store);
  const [orderHistory, setOrderHistory] = useState(null);
  //   useEffect(() => {
  //     dispatch({ type: "CLEAR_CART" });
  //   }, []);
  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await axios.get(
          "/api/gadgets/order/" + state.user._id
        );
        setOrderHistory(data.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);
  console.log("res", orderHistory);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        {orderHistory?.orderItems?.length > 0 ? (
          <table className="table-auto w-full text-black">
            <thead>
              <tr className="border-b-2 my-4 ">
                <th className="px-3 py-2 ">Gadget Id</th>
                <th className="px-1 py-2">Name</th>
                <th className="px-1 py-2">Date</th>
                <th className="px-1 py-2">Paid</th>
                <th className="px-1 py-2">Delivered</th>
                <th className="px-1 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.orderItems?.map((gadget, index) => (
                <tr key={index} className="border-b-2 my-4 ">
                  <td className="px-3 py-2 text-center">{gadget._id}</td>
                  <td className="px-3 py-2 text-center">{gadget.name}</td>
                  <td className="px-3 py-2">
                    {orderHistory.createdAt.split("T")[0]}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {gadget.isPaid ? "Paid" : "not Paid"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {gadget.isDelivered ? "Delivered" : "not Delivered"}
                  </td>
                  <td>
                    <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex ">
            <p className="text-4xl text-black text-center ">No order yets</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderHistoryScreen;
