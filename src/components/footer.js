import React from 'react';

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top"
      style={{ backgroundColor: "black", bottom: 0, width: "100%",marginTop:"30px",color:"white" }}>
      
      {/* Left Side - Copyright */}
      <p className="col-md-4 mb-0 ">© 2025 NewsBite, Inc</p>

      

      {/* Right Side - Links */}
      <div style={{ display: "flex", gap: "15px",paddingRight:"10px"}}>
        <a href="/" className="nav-link px-2 " style={{color:"white"}}>Home</a>
        <a href="#" className="nav-link px-2 " style={{color:"white"}}>About</a>
      </div>

    </footer>
  );
}
