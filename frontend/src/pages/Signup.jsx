import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });
    const handleChange = (e)=>{
        const {name, value} = e.target;

        setFormData((prev)=>({
            ...prev, [name]:value
        }))
    }

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(formData.password.length < 7 ){
            return alert("Password must be of 7 characters.")
        }
        if(formData.username=== "" || formData.email === "" || formData.password === ""){
            return alert("All fields are required");
        }
        console.log(formData);
        try{
            const fetch = await axios.post("http://localhost:2000/api/user/signup",formData);
            console.log(fetch.data);
            alert(fetch.data.message);
            navigate("/signin")
        }catch(err){
            alert(err?.response?.data?.message);
            console.log(err);

        }
    }

  return (
    <div className='w-[500px] bg-amber-100 p-4 rounded-md'>
        <h1 className='text-4xl text-blue-600 font-bold'>SignUp</h1>
        <form onSubmit={handleSubmit}  action="" className='my-4 flex flex-col  gap-4'>
            <div className='flex  flex-col'>
                <label className='text-md font-bold' htmlFor="username">Username</label>
                <input name="username" onChange={handleChange} className='bg-white p-2 rounded-md' id='username' type="text" value={formData.username} placeholder='username...' />
            </div>
            <div className='flex  flex-col'>
                <label className='text-md font-bold' htmlFor="username">Email</label>
                <input name="email" onChange={handleChange} className='bg-white p-2 rounded-md' id='email' type="email" value={formData.email} placeholder='email...' />
            </div>
            <div className='flex  flex-col'>
                <label className='text-md font-bold' htmlFor="password">Password</label>
                <input name="password" onChange={handleChange} className='bg-white p-2 rounded-md' id='password' type="password" value={formData.password} placeholder='password...' />
            </div>

            <div>
                <button type="submit" className='bg-blue-400 w-full p-3 rounded-md text-white font-bold text-2xl hover:bg-blue-600 transition-all duration-300'>Signup</button>
            </div>
        </form>
        <p className='text-center'>Already have an account? <Link to="/signin" className='text-sm font-bold text-blue-800 hover:text-blue-900'>SignIn</Link></p>
    </div>
  )
}

export default Signup