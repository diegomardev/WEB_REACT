import React, { useState } from 'react';
import './Navbar.css';
import demonlogo from '../../assets/images/demon.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function gohome() {
    window.location.href = '/home';
  }
  return (
    <div className='navbar_cabecera'>
      <img src={demonlogo} className='navbar_logo' onClick={gohome} />
      <div className={`navbar_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`navbar_items ${isOpen && "open"}`}>
        <a href='/home'>Home</a>
        <a href='/games'>Games</a>
        <a href='/contact'>Contact</a>
        <a href='/blog'>Blog</a>
        <a href='/about'>About</a>
        <a href='/login'>Login</a>
      </div>
    </div>
  )
}
export default Navbar;