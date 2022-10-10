import Link from "next/link";
import { ImCross } from "react-icons/im";
const SideMenu = ({ handleSideMenu }) => {
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
        <Link href={"/gadgets/orderhistory"} className="text-white">
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              handleSideMenu(false);
            }}
          >
            Order history
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
