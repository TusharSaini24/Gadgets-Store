import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { Store } from "../utils/Store";

const SideMenu = ({ handleSideMenu }) => {
  const { state, dispatch } = useContext(Store);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(state.user.isAdmin);
  }, [state.user]);
  console.log(state);
  return (
    <div className="flex fixed top-0 right-0  w-3/12 h-screen bg-green-600 z-50 transition-all ease-in-out">
      <button
        className="absolute flex items-center justify-center top-2 right-1 transition-all"
        onClick={() => {
          handleSideMenu(false);
        }}
      >
        <ImCross className="text-lg text-white " />
      </button>
      <div className="absolute flex flex-col top-6 left-5 transition-all w-full ">
        <Link href={"/gadgets/Laptops"} className="text-white">
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              handleSideMenu(false);
            }}
          >
            Laptops
          </span>
        </Link>
        <Link href={"/gadgets/Guitars"} className="text-white">
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              handleSideMenu(false);
            }}
          >
            Guitars
          </span>
        </Link>
        <Link href={"/gadgets/AndroidPhones"} className="text-white">
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              handleSideMenu(false);
            }}
          >
            Android Phones
          </span>
        </Link>
        <div className="w-11/12 border-b-2 bg-white my-3"></div>
        <Link
          href={`${
            isAdmin ? "/admin/allorderhistory" : "/gadgets/orderhistory"
          }`}
          className="text-white"
        >
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              handleSideMenu(false);
            }}
          >
            Order history
          </span>
        </Link>

        <span
          className="text-white cursor-pointer"
          onClick={() => {
            console.log("before dispatch");
            dispatch("USER_LOGOUT");
          }}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
