import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import Navbar from '../../../components/Navbar/Navbar';
import TOKENS from '../../../../data/constants';
import './Pixel_Art.css';

const supabaseUrl = TOKENS.SUPABASE.URL;
const supabaseKey = TOKENS.SUPABASE.KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const colorPalette = [
  '#000000', // Black
  '#FFFFFF', // White
  '#DB4437', // Red
  '#0F9D58', // Green
  '#4285F4', // Blue
  '#F4B400', // Yellow
  '#DA1884', // Magenta
  '#36C5F0', // Cyan
];

const Pixel_Art = () => {
  const [selectedColor, setSelectedColor] = useState('#00FFFF'); // Default color is black
  const [pixels, setPixels] = useState([]);
  const [mundial_pixels, setMundial_pixels] = useState([]);

  // Create an empty 16x16 pixel grid
  const initializePixels = () => {
    const initialPixels = new Array(16).fill(null).map(() => new Array(16).fill('#000000'));
    setPixels(initialPixels);
  };

  // Handle pixel click and update the color
  async function handlePixelClick(row, col) {
    const updatedPixels = [...pixels];
    updatedPixels[row][col] = selectedColor;
    setPixels(updatedPixels);
    //console.log([pixels]);
    
    const tableName = 'Pixel_Art';
    const { data, error } = await supabase
    .from(tableName)
    .update([{pixel_colors: pixels }])
    .eq('id', 1)
    .select()
    if (error) {throw error;}
  };

  async function leerDatos() { // Define la función para leer datos
    try {
      // Nombre de la tabla que deseas leer
      const tableName = 'Pixel_Art';
      // Realiza la consulta para obtener los datos
      const { data, error } = await supabase
      .from(tableName)
      .select('pixel_colors')
      if (error) {throw error;}
      console.log('Datos leídos correctamente:', data[0].pixel_colors);
      setPixels(data[0].pixel_colors);
    } catch (error) {
      console.error('Error al leer datos:', error.message);
    }
  }
  //Nos subscribimos a la tabla para que nos notifique cuando se haga un cambio 
  //y actualizamos los colores de los pixeles
  useEffect(() => {
    const tableName = 'Pixel_Art';
    const subscription = supabase
      .channel(tableName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
        },
        (payload) => setPixels(payload.new.pixel_colors)
      )
      .subscribe();

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Initialize the pixel grid when the component mounts
  useEffect(() => {
    // Inicializa la cuadrícula de píxeles cuando el componente se monta
    initializePixels();
    leerDatos();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <h1 className="read-the-docs">Pixel Art</h1>
      <div className="pixel-grid">
        {pixels.map((row, rowIndex) => (
          <div key={rowIndex} className="pixel-row">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="pixel"
                style={{ backgroundColor: color }}
                onClick={() => handlePixelClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="color-palette">
        {colorPalette.map((color) => (
          <div
            key={color}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pixel_Art;
