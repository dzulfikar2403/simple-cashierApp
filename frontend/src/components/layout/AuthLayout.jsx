import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, mainTitleTo, titleTo }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center ">
      <div className="min-h-80 flex border-2 border-[#1E1E1E] rounded">
        <div className="w-48 px-4 py-16 flex justify-end items-center gap-4 flex-col bg-[#1E1E1E]">
          <h1 className=" text-center text-xl text-white font-bold">{mainTitleTo}</h1>
          <Link to={`/${titleTo}`} className="text-xl bg-white font-bold px-4 py-2 border-2 border-white rounded transition-all duration-500 hover:bg-transparent hover:text-white">{titleTo}</Link>
        </div>
        <div className="px-6 py-4 flex justify-center flex-col gap-10">{children}</div>
      </div>
    </div>
  );
};

const AuthLayoutForm = ({ children,typeAuth,onsubmit }) => {
  const {isError} = useSelector(state => state.authSlice);

  return (
    <>
      <h1 className="text-xl font-bold mx-auto ">{typeAuth}</h1>
      <form className="flex flex-col gap-6" onSubmit={onsubmit}>
        {children}
        <p className={`scale-0 text-rose-500 text-center transition-all duration-700 ${isError && 'scale-100' }`}>{isError}</p>
        <button type="submit" className={`w-1/2 mx-auto my-2 bg-black text-white font-semibold rounded-sm border-2 border-black transition-all duration-300 hover:bg-transparent hover:text-black`}>
          {typeAuth}
        </button>
      </form>
    </>
  );
};

const AuthLayoutInput = ({ type,title,onchange }) => {
  const [hidePw, setHidePw] = useState(true);
  return (
    <>
      {type !== 'password' ? (
        <input type={type} name={title} id={title} className="w-72 px-2 border border-slate-400 rounded-sm outline-none focus:border-2" placeholder={title} onChange={onchange}/>
      ) : (
        <div className="flex items-center">
          {hidePw ? (
            <>
              <input type="password" name={title} id={title} className="w-72 px-2 border border-slate-400 rounded-sm outline-none focus:border-2" placeholder={title} onChange={onchange}/>
              <span className="bg-white -ml-5 cursor-pointer">
                <HiEyeOff onClick={() => setHidePw((pre) => !pre)} />
              </span>
            </>
          ) : (
            <>
              <input type="text" name={title} id={title} className="w-72 px-2 border border-slate-400 rounded-sm outline-none focus:border-2" placeholder={title} onChange={onchange}/>
              <span className="bg-white -ml-5 cursor-pointer">
                <HiEye onClick={() => setHidePw((pre) => !pre)} />
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

AuthLayout.authForm = AuthLayoutForm;
AuthLayout.authInput = AuthLayoutInput;

export default AuthLayout;
