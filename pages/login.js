import React, { Component } from "react";
import OnboardingNavBar from "../components/navbar_onboarding";
import { useForm } from "react-hook-form";
import axios from "axios";
import bcrypt from "bcryptjs";

import cookie from "js-cookie";

import { useRef, useState } from "react";

import { login, useAuth } from "../modules/firebase";
import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";


function addCookie(val) {
  cookie.set("SID", val, { expires: 1 / 24 });
}

export default function Login() {
  // Firebase Login
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const upload = (data) => {
    handleLogin(data);
  };

  function checkCookie() {

    const router = useRouter();

    console.log(cookie.get("firstTime"))
  
    if(cookie.get("firstTime") === undefined) {

      addFirstTimeCookie();

      useEffect(() => {
        setTimeout(() => {
          router.push("/onboarding");
        }, 500);
      }, []);
    }
  }

  // For testing
  function addFirstTimeCookie() {
    cookie.set("firstTime", "1", { expires: 1 / 24 });
  }
  
  // For testing
  function removeCookie() {
    cookie.remove("firstTime");
  }
  

  async function handleLogin(data) {
    setLoading(true);
    try {
      await login(data["email"], data["password"]);
    } catch {
      alert("Error!");
    }
    setLoading(false);

    console.log("Login Successful!");

    addCookie(data["email"]);

    window.location.replace("/");
  }


  return (
    <>
    { checkCookie() }
    <div className="h-screen">
      <Head>
        <title>Log In | AGAP</title>
      </Head>
      <OnboardingNavBar />
      <div className="mx-8 xl:mx-16 2xl:mx-64 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none justify-items-center items-center lg:h-3/4">
        <div className="row-span-1 lg:col-span-1 justify-items-center items-center p-5">
          <h1 className="font-extrabold text-5xl mb-5">
            It's great to see you again.
          </h1>
          <p className="text-lg">
            Login into an existing account to find out the latest notifications
            and reports around your area.
          </p>
          <p className="mt-10 text-sm">
            Your account is subject to AGAP's{" "}
            <a href="./terms">Terms and Conditions</a> and{" "}
            <a href="./privacy">Privacy Policy</a>
          </p>
        </div>
        <div className="row-span-1 lg:col-span-1 grow-0 p-5 w-full">
          <div className="p-6 shadow-lg rounded-lg bg-white">
            <form
              className="space-y-4"
              onSubmit={handleSubmit((data) => upload(data))}
            >
              {/* name div */}
              <div>
                <div>
                  <div className="space-y-2">
                    <label>Email</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="johndoe@agap.ph"
                      {...register("email", { required: true })}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <label>Password</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  class="shadow bg-blue-400 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 text-center">
                  Need an account?{" "}
                  <a href="/signup" className="hover:text-black">
                    Sign up now.
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
