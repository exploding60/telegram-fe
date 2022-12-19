import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const resultSocket = io("http://localhost:3006");
    setSocket(resultSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("messageBe", (data) => {
        setMessages((current) => [...current, data]);
      });
    }
  }, [socket]);

  const handleMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="App">
      <ul>
        {messages.map((item, index) => (
          <li key={index + 1}>
            {item.message} - {item.date}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleMessage}>tes</button>
    </div>
  );
}

export default Chat;
