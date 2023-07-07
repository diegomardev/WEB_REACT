import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../../../index.css';
import './Twitch_Chat.css';
import Navbar from '../../../components/Navbar/Navbar';
import confetti from 'canvas-confetti';
import tmi from 'tmi.js';

// Configura tu conexión a Supabase
const supabaseUrl = "https://dnaxvipqtbtqnzpeoovp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuYXh2aXBxdGJ0cW56cGVvb3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2Njk3MTAsImV4cCI6MjAwMjI0NTcxMH0.a_1fjstV1Q9vU5YXJEcW5ZmIxnRvn0YZsdSblqYgOLM";
const supabase = createClient(supabaseUrl, supabaseKey);

let x = 0;
function mayusPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Twitch_Chat() {
  const [count, setCount] = useState(0);
  const [confettiCount, setConfettiCount] = useState(0);
  const [url, setUrl] = useState('https://www.twitch.tv/kidi');
  const [channelName, setChannelName] = useState('kidi');
  const [cambiochannelName, setCambiochannelName] = useState('kidi');
  const [colormessagechannel, setColormessagechannel] = useState('red');
  const [messages, setMessages] = useState(['','','','','','','','','','']);
  useEffect(() => {
    if(localStorage.getItem('channelName') !== null){
      setChannelName(localStorage.getItem('channelName'));
      setCambiochannelName(localStorage.getItem('channelName'));
      setUrl("https://www.twitch.tv/"+localStorage.getItem('channelName'));
    }
  }, []);

  const rotateMessages = (newMessage, displayName, color, date, subscriber, mod) => {
    if(color === undefined || color === null){
      color = 'violet';
    }
    let suscriptor="";
    if(subscriber){
      suscriptor = "💰";
    }
    let moderador="";
    if(mod){
      moderador="🤺";
    }
    setMessages((prevMessages) => {
      const updatedMessages = [
        {
          message: newMessage,
          displayName: displayName,
          color: color,
          date: date,
          subscriber: suscriptor,
          mod: moderador
        },
        ...prevMessages.slice(0, 9)
      ];
      return updatedMessages;
    });
  };

  const handleMessage = (channel, tags, message, self) => {
    // Ignora los mensajes enviados por el propio bot
    if (self) return;

    setCount((prevCount) => (prevCount >= 9 ? 0 : prevCount));
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    rotateMessages(message, (" "+tags['display-name']+": "), tags.color, (hour+":"+min+" "), tags.subscriber, tags.mod);
    if(tags.color === undefined || tags.color === null){
      tags.color = 'violet';
    };
    setColormessagechannel(tags.color);
    //console.log(tags);
  };

  useEffect(() => {
    const client = new tmi.Client({
      channels: [channelName]
    });
    client.connect();
    client.on('message', handleMessage);

    return () => {
      client.off('message', handleMessage);
      client.disconnect();
    };
  }, [channelName]);
  const handleKeyPress = (e, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback();
    }
  };
  const changeURL = () => {
    const newChannelName = url.replace(/^https:\/\/www.twitch.tv\//, '');
    setChannelName(newChannelName);
    setCambiochannelName(newChannelName);
    localStorage.setItem('channelName', newChannelName);
  };
  const changeChannel = () => {
    setCambiochannelName(cambiochannelName.toLowerCase());
    setChannelName(cambiochannelName.toLowerCase());
    setUrl("https://www.twitch.tv/"+cambiochannelName.toLowerCase())
    localStorage.setItem('channelName', cambiochannelName.toLowerCase());
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1 className="read-the-docs">Twitch Chat</h1>
      <div>
        <label htmlFor="urlInput">URL de Twitch:</label>
        <input
          id="urlInput"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, changeURL)}
        />
        <button className="botones botones_twitch" onClick={changeURL}>Cambiar URL</button>
      </div>
      <div>
        <label htmlFor="channelInput">Canal de Twitch:</label>
        <input
          id="channelInput"
          type="text"
          value={cambiochannelName}
          onChange={(e) => setCambiochannelName(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, changeChannel)}
        />
        <button className="botones" onClick={changeChannel}>Cambiar Canal</button>
      </div>
      <div className="channelname" onClick={() => window.open(url, '_blank')}>{mayusPrimeraLetra(channelName)} Chat</div>
      <div className="chat">
        {messages.map((message, index) => (
          <p key={index} className="message">
            <span style={{ color: 'grey' }}>
              {message.date}
            </span>
            <span>
              {message.mod}
            </span>
            <span>
              {message.subscriber}
            </span>
            <span style={{ color: message.color }}>
              {message.displayName}
            </span >
            <span>
              {message.message}
            </span>
          </p>
        ))}
      </div>
      <p className="read-the-docs">
        Mesagges
      </p>
    </>
  );
}

export default Twitch_Chat;
