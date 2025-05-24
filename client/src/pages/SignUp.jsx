import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto font-semibold'>
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border border-gray-400 p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border border-gray-400  p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border border-gray-400  p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ">Sign Up  </button>
      </form>
      <div>
        <p className="flex gap-2 mt-5">
          Already have an account?
          <Link to="/ Sign in">
            <span className="text-blue-700 ">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
