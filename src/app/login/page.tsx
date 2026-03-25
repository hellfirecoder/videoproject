"use client ";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
     const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const router=useRouter();


      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault();

          await signIn("credentials",{
            email,
            password,
            redirect:false
          }).then((res)=>{
            if(res?.ok){
              router.push("/");
            }else{
              alert("Invalid credentials");
            }
          }).catch((err)=>{
            alert("An error occurred during login");
          })
      }
      

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button type="submit">Login</button>
        </form> 
        <div>
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
        
    </div>
  )
}

export default LoginPage