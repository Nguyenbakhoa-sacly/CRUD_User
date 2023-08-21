import React, { useEffect } from 'react'
import '../assets/scss/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoCaretBackOutline } from 'react-icons/io5'
import { BsTwitter, BsGithub, BsGoogle } from 'react-icons/bs'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { useState } from 'react';
import { loginAPI } from '../services/UserService';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHiddenShow, setIsHiddenShow] = useState(false)
  const [loadingAPI, setLoadingAPI] = useState(false)


  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoadingAPI(true);
    if (!email || !password) {
      toast.error('Email or password is required!')
      return;
    }
    let res = await loginAPI(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token)
      navigate('/')
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error)
      }
    }
    setLoadingAPI(false)
  }


  return (
    <>

      <div className='wrapper'>
        <div className="form-container">
          <p className="title">Login</p>
          <form className="form" onSubmit={handleLogin} >
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isHiddenShow === true ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="" />
              <label className='input-hiden-show-pass'>
                {
                  isHiddenShow === true ? <BiShowAlt onClick={() => setIsHiddenShow(!isHiddenShow)} /> : <BiHide onClick={() => setIsHiddenShow(!isHiddenShow)} />
                }

              </label>

              <div className="forgot">
                <Link rel="noopener noreferrer" to=''>Forgot Password ?</Link>
              </div>
              {loadingAPI && <Loader />}
            </div>
            <button
              type='submit'
              disabled={email && password ? false : true}
              className={email && password ? "active" : "sign"}
            >
              Sign in
            </button>
          </form>

          <div className="social-message">
            <div className="line"></div>
            <p className="message">Login with social accounts</p>
            <div className="line"></div>
          </div>
          <div className="social-icons">
            <button aria-label="Log in with Google" className="icon">
              < BsGoogle className="w-5 h-5 fill-current" />
            </button>
            <button aria-label="Log in with Twitter" className="icon">
              < BsTwitter className="w-5 h-5 fill-current" />

            </button>
            <button aria-label="Log in with GitHub" className="icon">
              < BsGithub className="w-5 h-5 fill-current" />
            </button>
          </div>
          <p className="signup">Don't have an account?
            <Link rel="noopener noreferrer" to='/logup' className="">Sign up</Link>
          </p>
          <div className='goback'>

            <p>  <IoCaretBackOutline />  Go back</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login