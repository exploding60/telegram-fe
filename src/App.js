import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login";
import Chat from "./pages/components/chat/ChatPage/ChatPage";
import Home from "../src/pages/Chat";
import Join from "../src/pages/join";
import Register from "../src/pages/register/";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
function App() {
  const socket = socketIO.connect("http://localhost:3009");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join socket={socket} />} />
        <Route path="*" element={<div>Page not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
