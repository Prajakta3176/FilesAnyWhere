import React from 'react'
// components/Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const navigate = useNavigate();
      const handleLogout = ()=>{
        localStorage.clear();
        navigate("/signin");
      }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-center">
        <div className="text-xl font-bold text-blue-600">📂 FileAnywhere</div>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
         
          <li className={`${isLoggedIn ? "block" : "hidden"}`}><a href="/upload" className="hover:text-blue-600">Upload</a></li>
          <li className={`${isLoggedIn ? "block" : "hidden"}`}><a href="/my-files" className="hover:text-blue-600">My Files</a></li>
          <li className={`${isLoggedIn ? "hidden" : "block"}`}><a href="/signin" className="text-blue-600 font-semibold">Sign In</a></li>
          <li className={`${isLoggedIn ? "hidden" : "block"}`}><a href="/signup" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Sign Up</a></li>
          <li className={`${isLoggedIn ? "block" : "hidden"}`}><button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Logout</button></li>
        </ul>
        {/* <div className="md:flex hidden space-x-4">
          
        </div> */}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue-600 absolute right-2 top-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


        {isOpen && (
        <div className="md:hidden px-4 pb-4 my-6">
          <ul className="space-y-3 text-gray-700 font-medium">
            {/* <li><a href="/" onClick={() => setIsOpen(false)}>Home</a></li> */}
            <li><a href="/upload" onClick={() => setIsOpen(false)}>Upload</a></li>
            <li><a href="/my-files" onClick={() => setIsOpen(false)}>My Files</a></li>
            {/* <li><a href="/about" onClick={() => setIsOpen(false)}>About</a></li> */}
            <li><a href="/signin" onClick={() => setIsOpen(false)}>Sign In</a></li>
            <li>
              <a href="/signup" onClick={() => setIsOpen(false)} className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      )}
      </div>
    </nav>
  )
}

export default Navbar