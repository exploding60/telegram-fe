import React, { useState } from "react";
import style from "./style.module.css";
const ChatFooter = ({ socket }) => {
  const username = localStorage.getItem("userName");
  const [message, setMessage] = useState("");
  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSubmit = () => {
    const userName = localStorage.getItem("userName");
    socket.emit("newUser", { userName, socketID: socket.id });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className={style.footer}>
      <form className={style.form} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your messages...."
          className={style.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
