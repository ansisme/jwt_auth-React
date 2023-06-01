import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [emailerror, setEmailError]= useState('');
  const [passworderror, setPasswordError]= useState('');
  const handleSubmit=async (e)=>{
  e.preventDefault();
  try{
    const res = await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {'Content-Type': 'application/json'}
    });
  
  const data = await res.json();
  console.log(data);
  if (data.errors){
    setEmailError(data.errors.email);
    setPasswordError(data.errors.password);
  }
  if(data.user){
    navigate('/');
  }
  }
  catch(e){
    console.log(e.message);
  }
}
const handleemail=(e)=>{
  setEmail(e.target.value);
}
const handlepassword=(e)=>{
  setPassword(e.target.value);
}
 
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <label for="email">Email</label>
        <input type="text" value={email} onChange={handleemail} required />
        <div className='email error'>{emailerror}</div>
      <label for="password" required>Password</label>
        <input type="password" value={password} onChange={handlepassword} />
        <div className='password error'>{passworderror}</div>
        <button type="submit">Login</button>
      </form>


    </div>
    
  )
}

export default Login