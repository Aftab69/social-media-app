import React from 'react';
import { useState } from 'react';
import "./Registerpage.css";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const handleChange = (e) =>{
    const val = e.target.value;
    const nam = e.target.name;

    setUser({...user, [nam]: val})
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    const { firstName, lastName, email, password, cpassword } = user;
    const res = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({
        firstName, lastName, email, password, cpassword
      })
    })
    const data = await res.json();
    console.log(data);

    if(res.status === 422 || res.status === 500 || !data){
      window.alert("Registration Failed");
    } else if (res.status === 201){
      window.alert("Registration successful");
      navigate("/login");
    }
  }

  return (
    <>
    <form>
      <div className='container_registerpage'>
          <div className='text_container_registerpage'>
            <div className='text_container_registerpage_each_element'><h3>First Name: </h3>
            <input name='firstName' onChange={handleChange}></input>
            </div>
            <div className='text_container_registerpage_each_element'><h3>Last Name: </h3>
            <input name='lastName' onChange={handleChange}></input>
            </div>
            <div className='text_container_registerpage_each_element'><h3>Email: </h3>
            <input name='email' onChange={handleChange}></input>
            </div>
            <div className='text_container_registerpage_each_element'><h3>Password: </h3>
            <input name='password' onChange={handleChange}></input>
            </div>
            <div className='text_container_registerpage_each_element'><h3>Confirm Password: </h3>
            <input name='cpassword' onChange={handleChange}></input>
            </div>
            <button onClick={handleClick}>Submit</button>
          </div>
      </div>
    </form>
  </>
  )
}

export default Registerpage