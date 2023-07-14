import { useState } from 'react'
import './Apps.css'
import Navbar from '../../components/Navbar/Navbar'

function Apps() {

  //ESTA FUNCION ME REDIRIGE A OTRA PAGINA
  function app1() {window.location.href = "apps/twitch_chat";}
  function app2() {window.location.href = "apps/threads_api";}
  
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
      </div>
    </div>
    </>
  )
}

export default Apps