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

function Twitch_Chat() {
  const [count, setCount] = useState(0);
  const [confettiCount, setConfettiCount] = useState(0);
  const [url, setUrl] = useState('https://www.twitch.tv/kidi');
  const [channelName, setChannelName] = useState('kidi');
  const [cambiochannelName, setCambiochannelName] = useState('kidi');
  const [messages, setMessages] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]);

  const client = new tmi.Client({
    channels: [channelName]
  });
  client.connect();

  const rotateMessages = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [newMessage, ...prevMessages.slice(0, 9)];
      return updatedMessages;
    });
  };

  const handleMessage = (channel, tags, message, self) => {
    // Ignora los mensajes enviados por el propio bot
    if (self) return;

    setCount((prevCount) => (prevCount >= 9 ? 0 : prevCount + 1));
    rotateMessages(`${tags['display-name']}: ${message}`);
    //console.log(tags);
  };

  useEffect(() => {
    client.on('message', handleMessage);

    return () => {
      client.off('message', handleMessage);
    };
  }, [channelName]);

  const handleClick = () => {
    x++;
    console.log(x);
  };
  const changeURL = () => {
    const newChannelName = url.replace(/^https:\/\/www.twitch.tv\//, '');
    setChannelName(newChannelName);
    setCambiochannelName(newChannelName);
  };
  const changeChannel = () => {
    setChannelName(cambiochannelName);
    setUrl("https://www.twitch.tv/"+cambiochannelName)
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <h1 className="read-the-docs">Twitch Chat</h1>
      <h1 className="click_text" onClick={handleClick}>
        🎉
      </h1>
      <div>
        <label htmlFor="urlInput">URL de Twitch:</label>
        <input
          id="urlInput"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="botones" onClick={changeURL}>Cambiar URL</button>
      </div>
      <div>
        <label htmlFor="channelInput">Canal de Twitch:</label>
        <input
          id="channelInput"
          type="text"
          value={cambiochannelName}
          onChange={(e) => setCambiochannelName(e.target.value)}
        />
        <button className="botones" onClick={changeChannel}>Cambiar Canal</button>
      </div>
      <div className="card">
        <div className="channelname">{channelName} Chat</div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Twitch_Chat;
