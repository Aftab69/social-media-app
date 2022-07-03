import React from 'react';
import { useState } from 'react';
import "./Uploadpage.css";
import {useNavigate} from "react-router-dom";

const Uploadpage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const handleChange = (e) =>{
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) =>{
            setImage(e.target.result);
        }
    }      
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(image){
  const res = await fetch("/uploads",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({data:image})
        });
        const data = await res.json();
        console.log(data);
        if(res.status===200){
          window.alert("Image successfully uploaded");
          navigate("/profile");
        } else if(res.status===400){
          window.alert("Storage limit reached");
          navigate("/profile");
        }
    }
  }

  return (
    <>
      <div className='uploadPageContainer'>
        <h4>Choose your file to upload: </h4>
        <input type="file" accept="image/*" onChange={handleChange}/>
        <div className='previewImageDiv'>
            <img src={image} alt={image}/>
        </div>
        {image &&
         <button onClick={handleSubmit} className='submitFileButton'>Submit</button>
         }
      </div>
    </>
  )
}

export default Uploadpage