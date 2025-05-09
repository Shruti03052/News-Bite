import React from 'react'
import Navbar from '../components/navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function Signup() {

    const[form,setForm]=useState({name:"",email:"",password:""});
    const navigate=useNavigate();
    const{setUser}=useContext(AuthContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await fetch("http://localhost:5000/api/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        });
        const data=await response.json();
        if(response.ok){
            console.log(data);
            toast.success("Account created successfully! Redirecting...");
            setTimeout(()=>navigate("/login"),2000);
            // alert("Account created Successfully");
            // navigate("/login")
        }
        else{
            console.log(data);
            toast.error("Enter valid credentials");
            // alert("Enter valid credentials");
        }



    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong");
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
         
         const data=await response.json();  //JWT token
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
    <GoogleOAuthProvider clientId='256223952510-tt469tdkdtvndjojg56l92b99qqesdnf.apps.googleusercontent.com'>
   <div>
    <Navbar />
   

    <div className='d-flex justify-content-center align-items-center' style={{marginTop:"80px"}}>
    <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        <h3>Sign up</h3>
        <p>Stay informed, Stay empowered</p>
  <form onSubmit={handleSubmit}>
<div className="mb-3">
<input type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" onChange={handleChange} name='name' value={form.name}/>
</div>
<div className='mb-3'>
<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail address" onChange={handleChange} name='email' value={form.email}/>
</div>

<div className="mb-3">

<input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' onChange={handleChange} name='password' value={form.password}/>

</div>
<div className="mb-3">
        <a href="#" className="text-primary text-decoration-none">Forgot password?</a>
</div>

<button type="submit" className="btn btn-primary w-100">Sign up</button>
</form>
<div className="d-flex align-items-center my-3">
<hr className="w-100"/>
<span className="mx-2">or</span>
<hr className="w-100"/>
</div>


<GoogleLogin onSuccess={handleGoogleLogin}onError={()=>toast.error("Google sign in failed!")}>

</GoogleLogin>

<div className="text-center mt-3">
      <small>Already have an account ? <a href="/login" className="text-primary text-decoration-none"> Sign in</a></small>
    </div>

</div>





</div>
<ToastContainer/>
</div>
</GoogleOAuthProvider>

  )
}
