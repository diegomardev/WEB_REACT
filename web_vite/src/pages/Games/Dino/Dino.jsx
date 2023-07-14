import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../../../index.css'
import './Dino.css';
import Navbar from '../../../components/Navbar/Navbar'
import ChromeDinoGame from 'react-chrome-dino';

const DinoGame = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <h1 className="read-the-docs">Dino Game</h1>
      <ChromeDinoGame />
    </div>
  );
};

export default DinoGame;
