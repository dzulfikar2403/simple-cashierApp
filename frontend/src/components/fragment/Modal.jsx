import React from "react";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ children, onclickModal }) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative z-10 w-1/2">
        <button className="absolute -top-2 -right-2 bg-slate-400 p-2 rounded text-white" onClick={onclickModal}>
          <HiOutlineX />
        </button>
        <div className=" rounded bg-slate-200 p-4 flex justify-center">{children}</div>
      </div>
    </div>
  );
};

const ModalForm = ({ children, encType, type, onsubmit,isError,isSucces }) => {
  return (
    <form encType={encType} className="flex flex-col gap-4" onSubmit={onsubmit}>
      {children}
      {encType === "multipart/form-data" && <small className="py-1 font-semibold">Notes: maks 3 - gambar. gambar tidak dapat diedit, pastikan masukan dengan benar! </small>}
      <pre className=" text-rose-600 mx-auto">{isError}</pre>
      <pre className=" text-teal-600 mx-auto">{isSucces}</pre>
      <button type="submit" className="w-20 mx-auto rounded bg-slate-950 text-white font-medium">
        {type === "tambah" ? "ADD" : "UPDATE"}
      </button>
    </form>
  );
};

const ModalInput = ({ title, nameId, type, onchange, value, multiple = false }) => {
  return (
    <div className={`w-72 flex mx-auto ${type === "radio" ? "flex-row-reverse justify-end gap-2": "flex-col" } `}>
      <label htmlFor={nameId}>{title}</label>
      <input type={type} value={value} name={nameId} id={nameId} multiple={multiple} className={`px-2 rounded border-2 border-sky-200 ${type === 'file' && 'border-none'}`} onChange={onchange} />
    </div>
  );
};

Modal.form = ModalForm;
Modal.input = ModalInput;

export default Modal;
