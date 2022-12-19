import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    const userName = localStorage.getItem("userName");
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;
