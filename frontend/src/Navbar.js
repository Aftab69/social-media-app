import React from 'react';
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navStyle = { textDecoration: 'none', color: 'black' };
    

  return (
    <>
        <nav>
            <NavLink to="/" style={navStyle}><div className='linkhover'>Home</div></NavLink>
            <NavLink to="/profile" style={navStyle}><div className='linkhover'>Profile</div></NavLink>
            <NavLink to="/login" style={navStyle}><div className='linkhover'>Login</div></NavLink>
            <NavLink to="/register" style={navStyle}><div className='linkhover'>Register</div></NavLink>
        </nav>
    </>
  )
}

export default Navbar