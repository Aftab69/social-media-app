import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./Profilepage.css";

const Profilepage = () => {

  const navigate = useNavigate();
  let [userData,setUserData] =useState();
  const [ styles, setStyles] = useState({visibility:"hidden"})
  const callAboutPage = async() =>{
    try{
      const res =  await fetch("/profile",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include"
      })
        const data = await res.json();
        setUserData(data);
        setStyles({visibility:"visible"});
        if(res.status === 400){
          navigate("/login");
        }
    }catch(error){
      navigate("/login");
      console.log(error);
    }
  }
  useEffect(()=>{
    callAboutPage();
    //eslint-disable-next-line
  },[])

  return (
  <>
    <div style={styles}>
      <div className='uploadDiv'>
        <Link to="/upload"><button className='uploadButton'>Upload</button></Link>
      </div>
      <div className='imagesShow'>
      {userData && userData.images.map((img)=>(
            <div className='imageBox'>
              <img src={img.image} alt={img._id}/>
            </div>         
      )   
      )
      }
      </div>
    </div>
  </>
  )
}

export default Profilepage;