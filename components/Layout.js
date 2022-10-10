import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import SideMenu from "./SideMenu";
import { useState } from "react";
const Layouts = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const handleSideMenu = (bool) => {
    setSideMenu(bool);
  };
  return (
    <>
      <Head>
        <title>Gadgets Store| Home</title>
        <meta name="keywords" content="ninjas" />
        <link rel="icon" href="/youth-icon " />
      </Head>
      <div className="flex  min-h-screen flex-col justify-between  ">
        {sideMenu && <SideMenu handleSideMenu={handleSideMenu} />}
        <Header handleSideMenu={handleSideMenu} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layouts;
