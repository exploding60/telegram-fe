import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login";
import Chat from "./pages/components/chat/ChatPage/ChatPage";
import Home from "../src/pages/Chat";
import Join from "../src/pages/join";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
function App() {
  const socket = socketIO.connect("http://localhost:3009");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/home" element={<Home socket={socket} />} />
        <Route path="/join" element={<Join socket={socket} />} />
        <Route path="*" element={<div>Page not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
