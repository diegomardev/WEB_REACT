import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import diegomar from '../../assets/users/diegomar.jpg'
import confetti from 'canvas-confetti'
import './Login.css'
import Navbar from '../../components/Navbar/Navbar'
import Atropos from 'atropos';
import MyCard from "./MyCard";

// Initialize
const myAtropos = Atropos({
  el: '.my-atropos',
  // rest of parameters
});

function Login() {
//añadimos la imagen de perfil local
  const user = {
    name: 'Diego Martínez',
    image: diegomar,
    imageSize: 90,
  };

  return (
    <>
      <div>
        <Navbar/>
      </div>
      <h1 className="read-the-docs">
          Login
      </h1>
      <div className='my-atropos'>
        <a href='https://www.linkedin.com/in/diegomarbar/' target='_blank' rel='noopener noreferrer'>
          <MyCard />
        </a>
      </div>
      <p className="read-the-docs">
        
      </p>
    </>
  )
}

export default Login