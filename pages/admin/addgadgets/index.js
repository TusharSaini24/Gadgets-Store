import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

import toast, { Toaster } from "react-hot-toast";
import { Store } from "../../../utils/Store";
const baseUrl = process.env.BASE_URL;
const AddGadgetScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  useEffect(() => {
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

  const handleAddGadget = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "f1vdwcc8");

    axios
      .post("https://api.cloudinary.com/v1_1/dautuqebn/image/upload", formData)
      .then((response) => {
        const gadget = {
          name,
          image: response.data.url,
          brand,
          category,
          description,
          rating,
          numReviews,
          price,
          countInStock,
        };
        const config = {
          headers: {
            "Contnet-Type": "application/json",
            authorization: `Bearer ${state?.user?.token}`,
          },
        };
        const { data } = axios
          .post("/api/admin/gadgets", gadget, config)
          .then((res) => {
            if (res.data.success) {
              toast.success("gadget success inserted");
              setName("");
              setImage("");
              setBrand("");
              setCategory("");
              setDescription("");
              setRating(0);
              setNumReviews(0);
              setPrice(0);
              setCountInStock(0);
            } else {
              toast.error("gadget not inserted");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <>
      {Object.keys(state?.user).length === 0 ||
      state?.user?.isAdmin === false ? (
        ""
      ) : (
        <section className="text-gray-600 body-font relative">
          <div className="relative container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Add Gadgets
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-col flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      //   value={image}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setImage(e.target.files)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={brand}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={category}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={description}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      rating
                    </label>
                    <input
                      type="text"
                      id="rating"
                      name="rating"
                      value={rating}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      numReviews
                    </label>
                    <input
                      type="text"
                      id="numReviews"
                      name="numReviews"
                      value={numReviews}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setNumReviews(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      price
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={price}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      stock
                    </label>
                    <input
                      type="text"
                      id="countInStock"
                      name="countInStock"
                      value={countInStock}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-2 w-full flex  items-center gap-2">
                  <button
                    className=" flex  text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                    onClick={handleAddGadget}
                  >
                    Add gadget
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Toaster />
    </>
  );
};

export default AddGadgetScreen;
