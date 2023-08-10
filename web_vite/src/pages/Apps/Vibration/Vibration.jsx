import React, { useState, useEffect } from 'react';
import '../../../index.css';
import './Vibration.css';
import Navbar from '../../../components/Navbar/Navbar';

function Vibration() {
  let [vibrationTime, setVibrationTime] = useState(200);
  const handleVibrationButtonClick = () => {
    navigator.vibrate(vibrationTime);
  };



  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  useEffect(() => {
    if ('LinearAccelerationSensor' in window) {
      const accelerometer = new LinearAccelerationSensor();
      accelerometer.addEventListener('reading', () => {
        setAccelerationData({
          x: accelerometer.x.toFixed(2),
          y: accelerometer.y.toFixed(2),
          z: accelerometer.z.toFixed(2)
        });
      });
      accelerometer.start();
    } else {
      console.log('El acelerómetro no es compatible con este dispositivo o navegador.');
    }

    if ('Gyroscope' in window) {
      const gyroscope = new Gyroscope();
      gyroscope.addEventListener('reading', () => {
        setGyroscopeData({
          x: gyroscope.x.toFixed(2),
          y: gyroscope.y.toFixed(2),
          z: gyroscope.z.toFixed(2)
        });
      });
      gyroscope.start();
    } else {
      console.log('El giroscopio no es compatible con este dispositivo o navegador.');
    }
  }, []);

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
      <div>
        <h1>Acelerómetro</h1>
        <p>Valor X: {accelerationData.x}</p>
        <p>Valor Y: {accelerationData.y}</p>
        <p>Valor Z: {accelerationData.z}</p>

        <h1>Giroscopio</h1>
        <p>Velocidad X: {gyroscopeData.x}</p>
        <p>Velocidad Y: {gyroscopeData.y}</p>
        <p>Velocidad Z: {gyroscopeData.z}</p>
      </div>

      <p className="read-the-docs">
        Click the button to vibrate the device.
      </p>
    </>
  );
}

export default Vibration;
