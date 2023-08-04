import React, { useState, useEffect } from 'react';
import '../../../index.css';
import './Vibration.css';
import Navbar from '../../../components/Navbar/Navbar';

function Threads_API() {
  let [vibrationTime, setVibrationTime] = useState(200);
  const handleVibrationButtonClick = () => {
    navigator.vibrate(vibrationTime);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1 className="read-the-docs">Vibration</h1>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(200);}}>STOP</button>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(200);}}>Vibrate 200ms</button>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(500);}}>Vibrate 500ms</button>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(1000);}}>Vibrate 1000ms</button>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(2000);}}>Vibrate 2000ms</button>
      <button className="botones_juegos my-button vibration_text" onClick={() => {navigator.vibrate(5000);}}>Vibrate 5000ms</button>
      <button className="botones_juegos my-button vibration_text" onClick={handleVibrationButtonClick}>
        Vibrate {vibrationTime}ms
      </button>
      <input
        className='input_vibration'
        type="number"
        name="vibration"
        id="vibration"
        placeholder="Vibration time"
        value={vibrationTime}
        onChange={(e) => setVibrationTime(Number(e.target.value))}
      />
      <p className="read-the-docs">
        Click the button to vibrate the device.
      </p>
    </>
  );
}

export default Threads_API;
