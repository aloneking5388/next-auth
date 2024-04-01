"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(response.data.message);
      router.push("/login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <div className="w-[350px] flex flex-col items-center text-black font-semibold justify-center bg-slate-400 rounded-md h-[550px]">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
     <hr />
     <label htmlFor="username">username</label>
     <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="username"
      required
      value={user.username}
      onChange={(e) => setUser({ ...user, username: e.target.value })}
      placeholder="Username"
      type="text"
       />
     <label htmlFor="email">Email</label>
     <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="email"
      required
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      placeholder="Email"
      type="email"
       />
     <label htmlFor="password">Password</label>
     <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      id="password"
      required
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      placeholder="Password"
      type="password"
       />
       <button className="p-2 border borded-gray-300 mb-4 focus:outline-none bg-orange-500 rounded-lg" onClick={onSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>
       <Link href="/login">Visit Login page</Link>
      </div>
    </div>
  )
};

export default page;
