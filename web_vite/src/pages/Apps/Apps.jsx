import { useState } from 'react'
import './Apps.css'
import Navbar from '../../components/Navbar/Navbar'

function Apps() {

  //ESTA FUNCION ME REDIRIGE A OTRA PAGINA
  function app1() {window.location.href = "apps/twitch_chat";}
  function app2() {window.location.href = "apps/threads_api";}
  function app3() {window.location.href = "apps/vibration";}
  
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <h1 className="read-the-docs">
        Apps
    </h1>
    <div>
      <div >
      <button className="botones_juegos my-button twitch_text" onClick={app1}>Twitch Chat</button>
      {/* <button className="botones_juegos" onClick={app2}>Threads API</button> */}
      <button className="botones_juegos my-button vibration_text" onClick={app3}>Vibration 📳</button>
      </div>
    </div>
    </>
  )
}

export default Apps