import React, { useState, useEffect } from 'react';
import '../../../index.css';
import './Vibration.css';
import Navbar from '../../../components/Navbar/Navbar';

function Threads_API() {
  const [url, setUrl] = useState('https://www.twitch.tv/kidi');

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1 className="read-the-docs">Vibration</h1>
      <button className="botones_juegos my-button vibration_text" onClick={() => {
        navigator.vibrate(500);
      }}>Vibrate</button>
      <p className="read-the-docs">
        Click the button to vibrate the device.
      </p>
    </>
  );
}

export default Threads_API;
