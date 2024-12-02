import "./index.css"
import { useState } from "react";
import Cookies from "js-cookie";
import {Link, Navigate} from 'react-router-dom'


const Register = (props) => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [errType,setErrType] = useState('')

    const cookie = Cookies.get('todo_token')
    if(cookie !== undefined){
        return <Navigate to="/" replace={true}/>
    }

    const errorColor = errType ? 'green' : ''

    const onSubmitForm = async (e) => {
      e.preventDefault()
      setErrType('')
      if(!username){
        setErrMsg('Please enter username')
      }
      else if(!email){
        setErrMsg('Please enter email')
      }
      else if(!password){
        setErrMsg('Please enter password')
      }
      else if(!confirmPassword || password !== confirmPassword){
        setErrMsg('Please enter correct password')
      }
      else{
        const userDetails = {username,email,password}
        const url = 'https://todo-backend-1-o8t5.onrender.com/register'
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
        setErrMsg(data.message)
        setErrType(data.type)
      }
      else{
        setErrMsg(data.message)
      }
      }
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  return (
    <div className="login-container">
       <div className="card">
        <h1 className='heading'>Login</h1>
        <form onSubmit={onSubmitForm}>
            <div className="input-container">
            <label htmlFor='name'>USERNAME</label>
            <input className='input' id='name' type='text' placeholder='Username' value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className="input-container">
            <label htmlFor='email'>EMAIL</label>
            <input className='input' id='email' type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="input-container">
            <label htmlFor='pass'>PASSWORD</label>
            <input className='input' id='pass' type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="input-container">
            <label htmlFor='confirm-pass'>CONFIRM PASSWORD</label>
            <input className='input' id='confrm-pass' type='password' placeholder='confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
            </div>
            <button type='submit' className="login-btn">Register</button>
            <p className="signup-link">Already have account? <Link className="link" to='/login'>Login</Link></p>
            {errMsg && <p className={`err ${errorColor}`}>{errMsg}</p>}
        </form>
      </div> 
    </div>
  );
}

export default Register