import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import MyFiles from './pages/MyFiles'
import { Route, Routes } from 'react-router-dom'
import Upload from './pages/Upload'

function App() {
   const isLoggedIn = localStorage.getItem("isLoggedIn");


  return (
    <>

      <div className=''>
        <Navbar/>

      <div className='flex justify-center items-center h-screen'>
          <Routes>
           
            <Route path='/' element={isLoggedIn ? <Upload/> : <SignIn/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/my-files' element={<MyFiles/>}/>
        </Routes>
      </div>
        


      </div>
        
    </>
  )
}

export default App
