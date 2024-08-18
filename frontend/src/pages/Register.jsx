import React, { useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAuth } from '../redux/reducer/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueForm,setValueForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 1,
  });

  const handleInput = (e) => {
    const {value,name} = e.target;

    setValueForm(pre => ({
      ...pre,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerAuth(valueForm));
  }

  return (
    <AuthLayout mainTitleTo={'Welcome Back'} titleTo={'login'}>
      <AuthLayout.authForm typeAuth={'Sign Up'} onsubmit={handleSubmit}>    
        <AuthLayout.authInput type={'text'} title={'name'} onchange={handleInput} required={true}/>
        <AuthLayout.authInput type={'text'} title={'email'} onchange={handleInput} required={true}/>
        <AuthLayout.authInput type={'password'} title={'password'} onchange={handleInput} required={true}/>
        <AuthLayout.authInput type={'password'} title={'confirmPassword'} onchange={handleInput} required={true}/>
      </AuthLayout.authForm>
    </AuthLayout>
  )
}

export default Register