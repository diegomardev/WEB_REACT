import React, { useState, useEffect } from 'react';
import './Snake.css';
import Navbar from '../../../components/Navbar/Navbar'

const initialSnake = [
  { x: 0, y: 10 },
  { x: 0, y: 11 },
  { x: 0, y: 12 },
];

const initialFood = { x: 5, y: 5 };

let nuevadireccion="";
let direccion="";
let setintervalo=170;
const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const GRID_SIZE = 20;

const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(moveSnake, setintervalo);
      return () => clearInterval(interval);
    }
  }, [snake, isRunning]);
/*
  useEffect(() => {
    handleStart();
  }, []);
*/
  const handleStart = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(DIRECTIONS.RIGHT);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setIsRunning(true);
    setintervalo=170;
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleRestart = () => {
    handleStop();
    handleStart();
  };

  const moveSnake = () => {
    if (gameOver) return;

    const head = { ...snake[0] };

    switch (direction) {
      case DIRECTIONS.UP:
        head.y--;
        break;
      case DIRECTIONS.DOWN:
        head.y++;
        break;
      case DIRECTIONS.LEFT:
        head.x--;
        break;
      case DIRECTIONS.RIGHT:
        head.x++;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake.slice(0, -1)];

    if (isCollision(head) || isOutOfBounds(head)) {
      setGameOver(true);
      setIsRunning(false);
    } else {
      if (isFoodCollision(head)) {
        const newFood = getRandomPosition();
        setFood(newFood);
        setSnake((prevSnake) => [head, ...prevSnake]);
        setScore((prevScore) => prevScore + 1);

        if ((score + 1) % 5 === 0) {
          setLevel((prevLevel) => prevLevel + 1);
          if(setintervalo>60){
            setintervalo=setintervalo-15;
          }
        }
      } else {
        setSnake(newSnake);
      }
    }
  };

  const handleKeyDown = (event) => {
    nuevadireccion = getNewDirection(event.keyCode);
    console.log("1---");
    console.log("Direction " + nuevadireccion);
    console.log("newDirection " + nuevadireccion);
    console.log("2---");
    if (nuevadireccion) {
      setDirection(nuevadireccion);
      direccion=nuevadireccion;
      console.log("Direction_seteada: " + nuevadireccion);
    }
  };

  const getNewDirection = (keyCode) => {
    console.log("keyCode: "+keyCode)
    if (
        (keyCode===38 && direccion!="DOWN") ||
        (keyCode===40 && direccion!="UP") ||
        (keyCode===37 && direccion!="RIGHT") ||
        (keyCode===39 && direccion!="LEFT")
    ) {
        switch (keyCode) {
        case 38: // ArrowUp
            console.log(DIRECTIONS.UP)
            return DIRECTIONS.UP;
        case 40: // ArrowDown
            console.log(DIRECTIONS.DOWN)
            return DIRECTIONS.DOWN;
        case 37: // ArrowLeft
            console.log(DIRECTIONS.LEFT)
            return DIRECTIONS.LEFT;
        case 39: // ArrowRight
            console.log(DIRECTIONS.RIGHT)
            return DIRECTIONS.RIGHT;
        default:
            return null;
        }
    }
  };
  const isCollision = (head) => {
    return snake.some((segment, index) => {
      if (index === 0) return false;
      return segment.x === head.x && segment.y === head.y;
    });
  };

  const isOutOfBounds = (head) => {
    return (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    );
  };

  const isFoodCollision = (head) => {
    return head.x === food.x && head.y === food.y;
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    console.log("Direction actualizada: " + direction);
  }, [direction]);
 
  return (
    <div>
       <div>
      <Navbar/>
    </div>
      <h1>Snake Game</h1>
      <div className="game-info">
          <div>Score: {score}</div>
          <div>Level: {level}</div>
        </div>
      <div className="game-board" tabIndex={0}>
        {gameOver ? (
          <div className="game-over">Game Over</div>
        ) : (
          <>
            {snake.map((segment, index) => (
                <div
                    key={index}
                    className={index === 0 ? (
                        direction === "UP" ? "snake-head-up": 
                        direction === "DOWN" ? "snake-head-down" : 
                        direction === "LEFT" ? "snake-head-left" : "snake-head-right") 
                        :  
                        index === snake.length - 1 ? "snake-tail" 
                        :
                        "snake-segment"}
                    style={{
                    top: `${segment.y * 20}px`,
                    left: `${segment.x * 20}px`,
                    }}
                />
            ))}
            
            <div
              className="food"
              style={{
                top: `${food.y * 20}px`,
                left: `${food.x * 20}px`,
              }}
            />
          </>
        )}
      </div>
      <div className="game-controls">
        {!isRunning ? (
          <button className='botones_juegos' onClick={handleStart}>Empezar</button>
        ) : (
          <button className='botones_juegos' onClick={handleStop}>Parar</button>
        )}
        <button className='botones_juegos' onClick={handleRestart}>Reiniciar</button>
      </div>
      <div>Direccion: {direccion}</div>
      <div>NUEVA Direccion: {nuevadireccion}</div>
      
    </div>
  );
};

export default SnakeGame;
