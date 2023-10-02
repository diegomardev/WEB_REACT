import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Tetris.css';
import Navbar from '../../../components/Navbar/Navbar'
import confetti from 'canvas-confetti'
import TOKENS from '../../../../data/constants';

// Tamaño de tetris 10x20
const ROWS = 20;
const COLUMNS = 10;

const Tetris = () => {
  // Define las formas de las piezas de Tetris
  const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], 
     [1, 1]],       // O
    [[1, 1, 1], 
     [0, 1, 0]],    // T
    [[1, 1, 1], 
     [1, 0, 0]],    // L
    [[1, 1, 1], 
     [0, 0, 1]],    // J
    [[1, 1, 0], 
     [0, 1, 1]],    // S
    [[0, 1, 1], 
     [1, 1, 0]],    // Z
  ];

  // Función para generar una nueva pieza de Tetris aleatoriamente
  const generateRandomPiece = () => {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[randomIndex];
    const col = Math.floor((COLUMNS - shape[0].length) / 2);
    return { shape, row: 0, col };
  };

  const [board, setBoard] = useState(() => Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null)));
  const [currentPiece, setCurrentPiece] = useState({ shape: SHAPES[1], row: 0, col: 3 });

  // Función para verificar si una posición es válida para la pieza actual
  const isPositionValid = (rowOffset, colOffset) => {
    const { shape, row, col } = currentPiece;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newRow = row + r + rowOffset;
          const newCol = col + c + colOffset;

          if (
            newRow < 0 ||
            newRow >= ROWS ||
            newCol < 0 ||
            newCol >= COLUMNS ||
            board[newRow][newCol] !== null
          ) {
            return false;
          }
        }
      }
    }

    return true;
  };

  const showpiece = () => {
    const newBoard = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

    // Copiar el contenido del tablero actual al nuevo tablero
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        newBoard[r][c] = cell;
      });
    });

    // Colocar la pieza en su nueva posición
    currentPiece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const newRow = currentPiece.row + r;
          const newCol = currentPiece.col + c;
          newBoard[newRow][newCol] = 1;
        }
      });
    });

    setBoard(newBoard);
  };

  // Función para mover la pieza hacia abajo
  const moveDown = () => {
    if (isPositionValid(1, 0)) {
      const newPiece = { ...currentPiece, row: currentPiece.row + 1 };
      setCurrentPiece(newPiece);
    } else {
      // Fijar la pieza en su posición actual y limpiar filas completas
      placePiece();
    }
  };

  // Función para fijar la pieza en su posición actual y limpiar filas completas
  const placePiece = () => {
    const newBoard = [...board];
  
    // Colocar la pieza en su nueva posición en el tablero
    currentPiece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const newRow = currentPiece.row + r;
          const newCol = currentPiece.col + c;
          newBoard[newRow][newCol] = 1;
        }
      });
    });
  
    setBoard(newBoard);
  
    // Generar una nueva pieza
    const newPiece = generateRandomPiece();
    setCurrentPiece(newPiece);
  };

  const start = () => {
    placePiece();
  };

  const stop = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null)));
  };

  // Función para manejar eventos de teclado
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'ArrowLeft' && isPositionValid(0, -1)) {
      setCurrentPiece((prevPiece) => ({ ...prevPiece, col: prevPiece.col - 1 }));
      showpiece();
    } else if (event.key === 'ArrowRight' && isPositionValid(0, 1)) {
      setCurrentPiece((prevPiece) => ({ ...prevPiece, col: prevPiece.col + 1 }));
      showpiece();
    } else if (event.key === 'ArrowDown') {
      moveDown();
    } else if (event.key === 'ArrowUp') {
      // Rotar la pieza
      const rotatedPiece = {
        ...currentPiece,
        shape: currentPiece.shape[0].map((_, i) => currentPiece.shape.map((row) => row[i])).reverse(),
      };

      if (isPositionValid(0, 0, rotatedPiece)) {
        setCurrentPiece(rotatedPiece);
      }
      showpiece();
    }
  }, [currentPiece]);

  // Manejar eventos de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Iniciar el juego generando la primera pieza
  useEffect(() => {
    if (!currentPiece.shape.length) {
      placePiece();
    }
  }, []);

  // Renderizar el tablero de juego
  const renderBoard = useMemo(() => {
    console.log("renderBoard");
    console.log(board);
    return board.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <div className={`cell ${cell ? 'filled' : ''}`} key={colIndex}></div>
        ))}
      </div>
    ));
  }, [board]);

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <h1 className="read-the-docs">Tetris</h1>
      <div className="tetris">
        <div className="game-board-tetris">{renderBoard}</div>
      </div>
      <div>
        <button onClick={start}>
          start
        </button>
        <button onClick={stop}>
          stop
        </button>
      </div>
    </div>
  );
};

export default Tetris;
