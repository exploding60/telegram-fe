import React, { useState, useEffect } from "react";
import style from "./style.module.css";
const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className={style.chat__sidebar}>
      <h2 style={{ color: "#7e98df", fontWeight: "700" }}>Chat App</h2>
      <div>
        <h4 className={style.chat__header}>All</h4>
        <div className={style.chat__users}>
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
