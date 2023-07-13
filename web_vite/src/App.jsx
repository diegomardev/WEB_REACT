import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home'
import Games from './pages/Games/Games'
import Snake from './pages/Games/Snake/Snake'
import Click from './pages/Games/Click_Game/Click_Game'
import Apps from './pages/Apps/Apps'
import Twitch_Chat from './pages/Apps/Twitch_Chat/Twitch_Chat'
import Contact from './pages/Contact/Contact'
import Blog from './pages/Blog/Blog'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App() {
  //La linea de route path="*" element={<PageNotFound />} sirve para que siempre que no encuentre una ruta, aparezca la pagina de error
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/snake" element={<Snake />} />
        <Route path="/games/click_game" element={<Click />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/twitch_chat" element={<Twitch_Chat />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;