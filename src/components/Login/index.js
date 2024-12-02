import { useState } from "react";
import "./index.css"
import Cookies from "js-cookie";
import {Link, Navigate, } from "react-router-dom";

const Login = (props) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const cookie = Cookies.get('todo_token')
    if(cookie!== undefined){
      return <Navigate to='/' />
    }

    const onSubmitForm = async (e) => {
      e.preventDefault()
      if(!username && !password){
        setErrMsg("please enter email & password")
      }
      else if (!username){
        setErrMsg("please enter email")
      }
      else if (!password){
        setErrMsg("please enter password")
      }
      else{
        const userDetails = {username:username,password:password}
        const url = 'https://todo-backend-1-o8t5.onrender.com/login'
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userDetails)
        }
      
      const response = await fetch(url,options)
      const data = await response.json()
      if(response.ok){
         Cookies.set('todo_token',data.jwtToken,{expires:30})
      }
      else{
        setErrMsg(data.message)
      }
      }
      setUsername('')
      setPassword('')
    }

  return (
    <div className="login-container">
       <div className="card">
        <h1 className='heading'>Login</h1>
        <form onSubmit={onSubmitForm}>
            <div className="input-container">
            <label htmlFor='name'>USERNAME</label>
            <input className="input" id='name' value={username} type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-container">
            <label htmlFor='pass'>PASSWORD</label>
            <input className="input" id='pass' value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-btn" type="submit">Login</button>
            <p className="signup-link">Don't have account? <Link className="link" to='/register'>Register</Link> </p>
            {errMsg && <p className="err">{errMsg}</p>}
        </form>
      </div> 
    </div>
  );
};

export default Login