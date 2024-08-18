import React, { useEffect, useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout'
import {useDispatch, useSelector} from "react-redux"
import { loginAuth } from '../redux/reducer/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.authSlice);
  const navigate = useNavigate();
  const [valueForm,setValueForm] = useState({
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    const {value,name} = e.target;

    setValueForm(pre => ({
      ...pre,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAuth(valueForm));
  }
  
  useEffect(() => {
    if(userInfo){
      navigate('/dashboard/home')
    }
  },[dispatch,userInfo])

  return (
    <AuthLayout mainTitleTo={'Create Account for Admin'} titleTo={'register'}>
      <AuthLayout.authForm typeAuth={'Login'} onsubmit={handleSubmit}>
        <AuthLayout.authInput type={'text'} title={'email'} onchange={handleInput}/>
        <AuthLayout.authInput type={'password'} title={'password'} onchange={handleInput}/>
      </AuthLayout.authForm>
    </AuthLayout>
  )
}

export default Login