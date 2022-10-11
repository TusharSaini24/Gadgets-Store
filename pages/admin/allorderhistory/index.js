import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../../utils/Store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
const OrderHistoryScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [orderHistory, setOrderHistory] = useState(null);
  useEffect(() => {
    console.log(
      "add gagets Object.keys(state?.user).length",
      Object.keys(state?.user).length
    );
    console.log("state?.user?.isAdmin ", state?.user?.isAdmin);
    if (
      Object.keys(state?.user).length === 0 ||
      state?.user?.isAdmin === false
    ) {
      toast.error("you are not authorizied for this page");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [state.user]);

  useEffect(() => {
    const run = async () => {
      try {
        const config = {
          headers: {
            "Contnet-Type": "application/json",
            authorization: `Bearer ${state?.user?.token}`,
          },
        };
        const { data } = await axios.get("/api/admin/orderhistory", config);
        setOrderHistory(data.data);
        console.log("data.data", data.data);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);
  console.log("res", orderHistory);
  return (
    <>
      {Object.keys(state?.user).length === 0 ||
      state?.user?.isAdmin === false ? (
        ""
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            {orderHistory?.length > 0 ? (
              <table className="table-auto w-full text-black">
                <thead>
                  <tr className="border-b-2 my-4 ">
                    <th className="px-3 py-2 ">order Id</th>
                    <th className="px-3 py-2 ">user Id</th>
                    <th className="px-3 py-2 ">gadget Id</th>
                    <th className="px-1 py-2">Name</th>
                    <th className="px-1 py-2">Date</th>
                    <th className="px-1 py-2">Paid</th>
                    <th className="px-1 py-2">Delivered</th>
                    <th className="px-1 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((oh, i) =>
                    oh.orderItems?.map((gadget, index) => (
                      <tr key={index} className="border-b-2 my-4 ">
                        <td className="px-3 py-2 text-center">{oh._id}</td>
                        <td className="px-3 py-2 text-center">{oh.user}</td>
                        <td className="px-3 py-2 text-center">{gadget._id}</td>
                        <td className="px-3 py-2 text-center">{gadget.name}</td>
                        <td className="px-3 py-2">
                          {oh.createdAt.split("T")[0]}
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
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <div className="flex ">
                <p className="text-4xl text-black text-center ">
                  No order yets
                </p>
              </div>
            )}
          </div>
        </section>
      )}
      <Toaster />
    </>
  );
};

export default OrderHistoryScreen;
