import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

const Loginpage = () => {

  const navigate = useNavigate();
  const [user,setUser] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    const val = e.target.value;
    const nam = e.target.name;
    setUser({...user,[nam]:val});
  }
  const handleClick = async(e) =>{
     e.preventDefault();
     const { email, password } = user;
     const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        email, password
      })
     })
     const data = await res.json();
     console.log(data);
     if(res.status===422 || !data){
      window.alert("Login failed")
     } else if(res.status===200){
      window.alert("Login successful");
      navigate("/profile");
     }
  }
  return (
    <>
    <div className='container_loginpage'>
        <div className='text_container_loginpage'>
          <div className='text_container_loginpage_each_element'><h3>Email: </h3>
          <input name='email' onChange={handleChange}></input>
          </div>
          <div className='text_container_loginpage_each_element'><h3>Password: </h3>
          <input name='password' onChange={handleChange}></input>
          </div>
          <button onClick={handleClick}>Submit</button>
        </div>
    </div>
  </>
  )
}

export default Loginpage