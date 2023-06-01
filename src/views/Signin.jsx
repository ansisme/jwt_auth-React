import React,{useState} from 'react';
import { useNavigate , Link} from 'react-router-dom';
const Signin = () => {
  const navigate = useNavigate();
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [emailerror, setEmailError]= useState('');
  const [passworderror, setPasswordError]= useState('');
  //async function
  const handleSubmit=async (e)=>{
  e.preventDefault();
  // console.log('Email',email);
  // console.log('password',password);

  try{
    const res = await fetch('http://localhost:4000/signup',{
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
    // navigate('/');
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
        <input type="text" value={email} onChange={handleemail} required />
        <div className='email error'>{emailerror}</div>
      <label htmlFor="password" required>Password</label>
        <input type="password" value={password} onChange={handlepassword} />
        <div className='password error'>{passworderror}</div>
        {/* <button type="submit">Signup</button> */}
        {emailerror || passworderror ? (
          <>
          <Link to='/login'>
          <button type="submit">Signup</button>
          </Link>
          
          </>
        ):(
        <>
        <button type="submit">Signup</button>
        <p>not signed in</p>
        </>
        )}
      </form>
    </div>
    
  )
}

export default Signin