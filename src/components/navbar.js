import React from 'react'

export default function Navbar() {
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
            <li><a className="dropdown-item" style={{color:'white'}} href="#">Entertainment</a></li>
            <li><a className="dropdown-item" style={{color:'white'}} href="#">Sports</a></li>
            
          </ul>
        </li>
        <li>
        <form className="d-flex ">
      <input className="form-control m-2" type="search" placeholder="Search" aria-label="Search" />
<button className="btn btn-outline-success m-2" type="submit">Search</button>

      </form>

        </li>
        
      </ul>
      
<div className='d-flex'>
<a className="nav-link active" aria-current="page" href="/login" style={{color:"white"}}>Login</a>
  <a href='/signup' className='btn 'style={{backgroundColor:"white"}}>Sign up</a>
</div>

    </div>
  </div>
</nav>
      
    </div>
  );
}
