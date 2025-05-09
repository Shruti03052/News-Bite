import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {

    // console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const[formData,setFormData]=useState({email:"",password:""});
    const navigate=useNavigate();
    const{setUser}=useContext(AuthContext);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        });

        const data=await response.json();
        console.log(data);
        if(response.ok){
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            setUser(data.user);
            console.log(data)
            toast.success("Logged in successfully! Redirecting...")
            setTimeout(()=>navigate("/"),2000);

        }
        else{
            toast.error("Invalid credentials");
        }
    }

    const handleGoogleLogin=async(e)=>{
        try{
            
            const decoded=jwtDecode(e.credential);
        // const {email,name,picture}=decoded;
        const response=await fetch("http://localhost:5000/api/google-login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({tokenId:e.credential})
            
        });
        
        const data=await response.json();
        // console.log(data)
        if(response.ok){
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(decoded));
            setUser(decoded);
            toast.success("Logged in successfully! Redirecting...");
            setTimeout(()=>navigate("/"),2000);
        }
        else{
            toast.error("Google Login failed!");
        }

        }
        catch(error){
            console.log(error);
            
        }
        


    }

  return (
    <GoogleOAuthProvider clientId="256223952510-tt469tdkdtvndjojg56l92b99qqesdnf.apps.googleusercontent.com">
  
 <div>
    <Navbar />
 
   
    <div className='d-flex justify-content-center align-items-center' style={{marginTop:"80px"}}>
        
        <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
            <h3>Sign in</h3>
            <p>Stay informed, Stay empowered</p>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
  
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail address" name='email' onChange={handleChange} />
    
  </div>
  <div className="mb-3">
    
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' name='password' onChange={handleChange}/>
    
  </div>
  <div className="mb-3">
            <a href="#" className="text-primary text-decoration-none">Forgot password?</a>
  </div>
 
  <button type="submit" className="btn btn-primary w-100">Sign in</button>
</form>
<div className="d-flex align-items-center my-3">
  <hr className="w-100"/>
  <span className="mx-2">or</span>
  <hr className="w-100"/>
</div>

<GoogleLogin onSuccess={handleGoogleLogin} 
onError={()=>toast.error("Google Login Failed!")}>
</GoogleLogin>

{/* <div>
    
    <button className='btn btn -light w-100 border py-2'>
    <img src="google_logo.png" width="30" className='me-2' ></img>
    Continue with Google</button>
</div> */}

<div className="text-center mt-3">
          <small>New to NewsBite ? <a href="/signup" className="text-primary text-decoration-none"> Sign Up</a></small>
        </div>

</div>
</div>


<ToastContainer/>

</div>
</GoogleOAuthProvider> 
  );
}
