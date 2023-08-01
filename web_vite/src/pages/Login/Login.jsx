import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import diegomar from '../../assets/users/diegomar.jpg'
import confetti from 'canvas-confetti'
import './Login.css'
import Navbar from '../../components/Navbar/Navbar'
import Atropos from 'atropos';
import MyImage from "./MyImage";

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
      {/* <div className="name_login">{user.name}</div> */}
      <div>
        <MyImage/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Login