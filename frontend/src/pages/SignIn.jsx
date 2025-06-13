import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
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
        console.log(formData);
       try{
         const res = await axios.post("http://localhost:2000/api/user/signin",formData);
         console.log(res.data);
         localStorage.clear();
         localStorage.setItem("id",res.data.id);
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("isLoggedIn",true);
         navigate("/upload");
       }catch(err){
        console.log(err);
       }
    }

  return (
    <div className='w-[500px] bg-amber-100 p-4 rounded-md'>
        <h1 className='text-4xl text-blue-600 font-bold'>SignIn</h1>
        <form onSubmit={handleSubmit}  action="" className='my-4 flex flex-col  gap-4'>
            <div className='flex  flex-col'>
                <label className='text-md font-bold' htmlFor="username">Email</label>
                <input name="email" onChange={handleChange} className='bg-white p-2 rounded-md' id='email' type="email" value={formData.email} placeholder='email...' />
            </div>
            <div className='flex  flex-col'>
                <label className='text-md font-bold' htmlFor="password">Password</label>
                <input name="password" onChange={handleChange} className='bg-white p-2 rounded-md' id='password' type="password" value={formData.password} placeholder='password...' />
            </div>

            <div>
                <button type="submit" className='bg-blue-400 w-full p-3 rounded-md text-white font-bold text-2xl hover:bg-blue-600 transition-all duration-300'>SignIn</button>
            </div>
        </form>
        <p className='text-center'>Or create new account <Link to="/signup" className='text-sm font-bold text-blue-800 hover:text-blue-900'>SignUp</Link></p>
    </div>
  )
}

export default SignIn