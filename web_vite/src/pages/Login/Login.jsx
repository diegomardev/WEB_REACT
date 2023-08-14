import React, { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import diegomar from '../../assets/users/diegomar.jpg';
import confetti from 'canvas-confetti';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';
import Atropos from 'atropos';
import MyCard from './MyCard';

// Initialize
const myAtropos = Atropos({
  el: '.my-atropos',
  // rest of parameters
});

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el estado de inicio de sesión
  const [isRegister, setIsRegister] = useState(false); // Estado para controlar el estado de inicio de sesión
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [repeatPasswordInput, setRepearPasswordInput] = useState('');
  // Función para alternar entre logueado y no logueado
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  // Función para alternar entre registrarse y no registrarse
  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
  };

  //Función para validar el usuario y la contraseña

  const handleLogin = () => {
    if (userInput === 'Diego' && passwordInput === '123') {
      setIsLoggedIn(true);
      confetti();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  //Función para registrar usuario

  const handleRegister = () => {
    const name = document.querySelector('.input').value;
    const user = document.querySelector('.input2').value;
    const password = document.querySelector('.input3').value;
    const password2 = document.querySelector('.input4').value;
    if (password === password2) {
      alert('Usuario registrado');
      setIsRegister(false);
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

  

  //añadimos la imagen de perfil local
  const user = {
    name: 'Diego Martínez',
    image: diegomar,
    imageSize: 90,
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1 className="read-the-docs">Login</h1>
      <button className="boton-login" onClick={handleLoginToggle}>
        {isLoggedIn ? 'Logout' : 'Login'} {/* Cambia el texto del botón */}
      </button>
      {isLoggedIn && (
        <div className="my-atropos">
          <a
            href="https://www.linkedin.com/in/diegomarbar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MyCard />
          </a>
        </div>
      )}
      {!isLoggedIn && !isRegister && (
        <div>
          <div className="input-group">
            <input
              required
              type="text"
              name="text"
              autoComplete="off"
              className="input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <label className="user-label">User</label>
          </div>
          <div className="input-group">
            <input
              required
              type="password"
              /* style={{ fontSize: '24px' }} */
              name="text"
              autoComplete="off"
              className="input"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <label className="user-label">Password</label>
          </div>
          <div>
            <button onClick={handleLogin}>
              {isLoggedIn ? 'Logout' : 'Login'} {/* Cambia el texto del botón */}
            </button>
            <button onClick={handleRegisterToggle}>
              {isRegister ? 'Cancel' : 'Register'} {/* Cambia el texto del botón */}
            </button>
          </div>
          
        </div>
      )}
      {!isLoggedIn && isRegister && (
        <div>
          <div className="input-group">
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">Name</label>
          </div>
          <div className="input-group">
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">Last Name</label>
          </div>
          <div className="input-group">
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">Email</label>
          </div>
          <div className="input-group">
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">User</label>
          </div>
          <div className="input-group">
            <input
              required
              type="password"
              name="text"
              autoComplete="off"
              className="input"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <label className="user-label">Password</label>
          </div>
          <div className="input-group">
            <input
              required
              type="password"
              name="text"
              autoComplete="off"
              className="input"
              value={repeatPasswordInput}
              onChange={(e) => setRepearPasswordInput(e.target.value)}
            />
            <label className="user-label">Repeat Password</label>
          </div>
          <div>
            <button onClick={handleRegisterToggle}>
              {isLoggedIn ? 'Logout' : 'Login'} {/* Cambia el texto del botón */}
            </button>
            <button onClick={handleRegister}>
              {isRegister ? 'Register' : 'Register'} {/* Cambia el texto del botón */}
            </button>
          </div>
          
        </div>
      )}
      
      
      <p className="read-the-docs">login: {isLoggedIn.toString()}</p>
      <p className='read-the-docs'>register: {isRegister.toString()}</p>
    </>
  );
}

export default Login;
