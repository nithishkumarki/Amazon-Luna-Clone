import React,{useState} from 'react'
import {Link} from "react-router-dom"
import "../CSS/SignupSignin.css"
import signupsignin from "../assets/logos/signupsignin_logo.png"

const SignupSignin = () =>
{
  const[state,setState]=useState("signin");

  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    reenterpassword:"",
  })

  const handleFormChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const changeState=()=>
  {
    if(state=="signin")
    {
      setState("signup");
    }
    else
    {
      setState("signin");
    }
  }

  const  signup=async()=>
  {
      let responseData;

      await fetch("http://localhost:8001/signup",
        {
        method:'POST',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData),
      } ).then((response)=>response.json()).then((data)=>responseData=data)

      if(responseData.status=="success")
      {
         localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else
      {
        alert(responseData.error);
      }
  }

   const signin=async()=>
  {
    
    let responseData;

    await fetch('http://localhost:8001/signin', 
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
     })
     .then((response)=>response.json())
     .then((data)=>responseData=data)

        if(responseData.success)
        {
          localStorage.setItem('auth-token',responseData.token);
          window.location.replace("/");
          console.log(responseData.token);
        }
        else
        {
          alert(responseData.error);
        }
        
  }

 return (
    <div className='signupsignin'>

          <img src={signupsignin} alt="" />

           <div className='signupsignin-container'>
            <div className="signupsignin-container-heading">

                {state=="signin"?
                <h1>Sign-in to Amazon</h1>:<h1>Create account</h1>}
            </div>
            {state=="signup"?<div>
                <label htmlFor="username">Your name</label>
                <input name='username' type="text" onChange={handleFormChange} value={formData.username} id='username' placeholder='First and last name' />
                </div>:<></>}
                
                

                <div>
                <label htmlFor="email">Email</label>
                <input name='email' type="email" onChange={handleFormChange} value={formData.email} id='email' placeholder='Email or mobile phone number' />
                </div>

               <div>
                <label htmlFor="password">Password</label>
                <input name='password' type="password" onChange={handleFormChange}  value={formData.password} id='password' placeholder='Enter password.'/>
               </div>

               {
               state=="signup"?
               <div>
                <label htmlFor="re-enter password">Re-enter password</label>
                <input name='reenterpassword' type='password' onChange={handleFormChange} value={formData.reenterpassword} id='password' placeholder='Re-enter password'/>
                </div>
               :
               <></>
               
              }
                

                <button onClick={()=>{state=="signup"?signup():signin()}} className='signupsignin-container-button'>{state=="signup"?"Create Your Amazon Account":"Continue"} </button>


                <div>By {state=="signup"?"creating an account":"continuing"}, you agree to Amazon's <Link className='signupsignin-link'> Conditions of Use</Link> and <Link className='signupsignin-link'> Privacy Notice.</Link></div>
           

           </div>
          
         { state=="signin"?
           (
           <div className="signupsignin-container-footer">
            <div> New to Amazon?</div>
            <button className='signupsignin-container-footer-button' onClick={changeState}>Create your Amazon account</button>
            </div>
            ):
            (
           <div className='signupsignin-container-footer'>            
            <div> already have an account?<Link className='signupsignin-link' onClick={changeState}>signin</Link></div>
             
           </div>
            )
        }
          <div className='signupsignin-year'>© 1996-2025, Amazon.com, Inc. or its affiliates</div>

    </div>
  )
}

export default SignupSignin