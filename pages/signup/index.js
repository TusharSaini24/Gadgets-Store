import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignupScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    try {
      const res = await axios.post("/api/user/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("server error");
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Sign Up for shopping
            </h1>
            <p className="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Signup
            </h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Fullname
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 
            rounded text-lg"
              onClick={handleSignUp}
            >
              Register
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Already registered ? &nbsp;
              <Link href={"/login"}>
                <a className="text-green-500 text-sm">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default SignupScreen;
