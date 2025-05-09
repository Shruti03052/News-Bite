import React from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';

export default function Navbar() {
  const {user,setUser}=useContext(AuthContext);
  const[showDropdown ,setDropDown]=useState(false);

  const handleLogout=()=>{
    localStorage.removeItem("user")
    setUser(null);
  }
const handleProfileDropdown=()=>{
  setDropDown(!showDropdown)
  
}

console.log(user);
  return (
    <div>
        <nav className="navbar navbar-expand-lg  " style={{backgroundColor:'black',position:"fixed",width:"100%",top:0,zIndex:1000,height:"13%"}}>
  <div className="container-fluid">
  <a className="navbar-brand" href="#">
      <img src="/logo.png" alt="" width="120px" height="100px"/>
    </a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/" style={{color:"white"}}>Home</a>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"style={{color:"white"}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor:'black'}}>
          <li><Link className="dropdown-item" style={{color:'white'}} to="/category/general">General</Link></li>
            <li><Link className="dropdown-item" style={{color:'white'}} to="/category/entertainment">Entertainment</Link></li>
            <li><Link className="dropdown-item" style={{color:'white'}} to="/category/sports">Sports</Link></li>
            <li> <Link className='dropdown-item' style={{color:"white"}} to='/category/business'>Business</Link></li>            
          </ul>
        </li>
        
        {user && (<li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/myfeed" style={{color:"white"}}>My Feed</Link>
          </li>
        )}

        
        
        <li>
        <form className="d-flex ">
      <input className="form-control m-2" type="search" placeholder="Search" aria-label="Search" />
<button className="btn btn-outline-success m-2" type="submit">Search</button>

      </form>

        </li>
        
      </ul>
    
      
<div className='d-flex align-items-center'>
  {user ? (
    <>
     <img src="user.png" onClick={handleProfileDropdown} style={{width:"40px", height:"40px"}}/>
     {showDropdown && (
      <div style={{
        position: "absolute",
        top: "60px",
        right: "0",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        zIndex: 999
      }}>
        <ul >
          <li> <Link to="/profile">My Profile</Link></li>
          <li> <Link to="/saved">Saved Articles</Link></li>
          <li> <button onClick={handleLogout}>Logout</button></li>       
        </ul>
      </div>

     )}
    </>
  ):(
    <>
     <a className="nav-link active" aria-current="page" href="/login" style={{color:"white"}}>Login</a>
     <a href='/signup' className='btn 'style={{backgroundColor:"white"}}>Sign up</a>
    </>
  )}

</div>

    </div>
  </div>
</nav>
      
    </div>
  );
}
