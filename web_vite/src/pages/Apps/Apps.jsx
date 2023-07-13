import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import confetti from 'canvas-confetti'
import './Apps.css'
import Navbar from '../../components/Navbar/Navbar'
import confetti_logo from '../../assets/images/confetti.svg'

let x = 0;
let clickX = 0; // Coordenada x relativa al ancho de la ventana
let clickY = 0;// Coordenada y relativa al alto de la ventana
function fireworks(){
  var duration = 5 * 1000; //5 segundos de duracion
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.5), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.5, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
function confetti_click(){
  confetti({
      origin: {
        x: clickX,
        y: clickY
      }
    });
}
// Agregar controlador de eventos de clic al documento

// El evento se dispara cuando se mueve el ratón
document.addEventListener('mousemove', function(event) {
  // Obtener coordenadas del evento de clic
  clickX = event.clientX / window.innerWidth; // Coordenada x relativa al ancho de la ventana
  clickY = event.clientY / window.innerHeight; // Coordenada y relativa al alto de la ventana
});

function Games() {
  //const [variable, setVariable] = useState(valorInicial);
  const [count, setCount] = useState(0)//el 0 de usestate es el valor inicial
  const [confetti_count, setConfetti] = useState(0)
  //creamos otra variable con useState

  const handleClick = () => {
    x++;
    console.log(x);
  };
  function handleClick2() {
    //confetti();
    confetti_click();
    setConfetti((confetti_count) => confetti_count + 1);
  }
  function handleClick3() {
    fireworks();
    setCount((count) => count + 1);
  }
  //ESTA FUNCION ME REDIRIGE A OTRA PAGINA
  function app1() {
    //vamos a la siguiente pagina creando una nueva /
    window.location.href = "apps/twitch_chat";
  }
  
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
      </div>
    </div>
    </>
  )
}

export default Games