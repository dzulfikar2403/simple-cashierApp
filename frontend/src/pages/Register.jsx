import React from 'react'
import AuthLayout from '../components/layout/AuthLayout'

const Register = () => {
  return (
    <AuthLayout mainTitleTo={'Welcome Back'} titleTo={'login'}>
      <AuthLayout.authForm typeAuth={'Sign Up'}>
        <AuthLayout.authInput type={'text'} title={'name'} />
        <AuthLayout.authInput type={'text'} title={'email'} />
        <AuthLayout.authInput type={'password'} title={'password'} />
        <AuthLayout.authInput type={'password'} title={'confirmPassword'} />
      </AuthLayout.authForm>
    </AuthLayout>
  )
}

export default Register