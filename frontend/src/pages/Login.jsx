import React, { useEffect, useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth, validateRegist } from "../redux/reducer/authSlice";
import Modal from "../components/fragment/Modal";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, userValidateRegist } = useSelector((state) => state.authSlice);
  const [toggleVerification, setToggleVerification] = useState(false);
  const [valueForm, setValueForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;

    setValueForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAuth(valueForm));
  };

  //function for validateRegist
  const useToggleVerif = () => {
    setToggleVerification((pre) => !pre);

    setValueForm((pre) => ({
      ...pre,
      email: "",
      password: "",
    }));
  };

  const handleValidate = (e) => {
    e.preventDefault();

    dispatch(validateRegist(valueForm));
  };

  useEffect(() => {
    if (userValidateRegist) {
      navigate("/register");
    }
  }, [userValidateRegist]);

  return (
    <>
      <AuthLayout mainTitleTo={"Create Account for Admin"} titleTo={"register"} onclick={useToggleVerif}>
        <AuthLayout.authForm typeAuth={"Login"} onsubmit={handleSubmit}>
          <AuthLayout.authInput type={"text"} title={"email"} onchange={handleInput} required={true} />
          <AuthLayout.authInput type={"password"} title={"password"} onchange={handleInput} required={true} />
        </AuthLayout.authForm>
      </AuthLayout>
      {toggleVerification && (
        <Modal onclickModal={useToggleVerif}>
          <Modal.form type={"validate"} isError={isError} onsubmit={handleValidate}>
            <Modal.input type={"text"} nameId={"email"} title={"email"} onchange={handleInput} />
            <Modal.input type={"password"} nameId={"password"} title={"password"} onchange={handleInput} />
          </Modal.form>
        </Modal>
      )}
    </>
  );
};

export default Login;
