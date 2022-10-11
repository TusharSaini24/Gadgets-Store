import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { BsSearch, BsFillCartFill } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { FaUserCircle } from "react-icons/fa";

// (state?.cart?.cartItem ?? []).length > 0
const Header = ({ handleSideMenu }) => {
  const { state, dispatch } = useContext(Store);
  const [userName, setUserName] = useState("");
  const [cartItemsCount, setCartItemCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setUserName(state?.user ? state.user.name : "");
    setIsAdmin(state?.user?.isAdmin);
    setCartItemCount(
      Number(state.cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    );
  }, [state?.cart?.cartItems, state?.user]);

  return (
    <header className="text-gray-600 body-font ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"}>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image
              src="/Logo.svg"
              width={128}
              height={77}
              alt="Gadgets Store"
            />
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <div className="bg-gray-100 flex justify-center items-center rounded-md p-1 mr-5">
            <BsSearch className="text-gray-600 text-base" />
            <input
              type="text"
              placeholder="search"
              className="outline-none ml-1 bg-gray-100  text-base "
            />
          </div>
        </nav>
        <button className="  inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          {isAdmin ? (
            <Link href={"/admin/addgadgets"}>
              <a className="relative mx-auto">
                <IoMdAdd className="mx-auto " /> gadget
              </a>
            </Link>
          ) : (
            <Link href={"/gadgets/cart"}>
              <a className="relative">
                <BsFillCartFill className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-2 ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </a>
            </Link>
          )}
        </button>
        <button className=" ml-5 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <Link href={"/login"}>
            <a className="relative mx-auto">
              <FaUserCircle className="mx-auto w-6 h-6 text-gray-600 hover:text-gray-900" />
              <p>{userName}</p>
            </a>
          </Link>
        </button>
        <button className=" ml-5 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          <HiOutlineMenu
            className="w-6 h-6 text-gray-600 hover:text-gray-900"
            onClick={() => {
              handleSideMenu(true);
            }}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
