import axios from "axios";

import Link from "next/link";
// import gadgets from "../data/gadgets";
const baseUrl = process.env.BASE_URL;

export default function Home({ gadgets }) {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {gadgets?.map((gadget, index) => (
            <Link href={`/gadgets/${gadget._id}`} key={index}>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    className="object-cover object-center w-full h-full block"
                    src={gadget.image}
                    alt={gadget.name}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {gadget.brand}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {gadget.name}
                  </h2>
                  <p className="mt-1">{gadget.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(baseUrl + "/api/gadgets");

  return {
    props: { gadgets: res.data.data },
  };
}
