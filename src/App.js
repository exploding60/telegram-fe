import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login";
import Chat from "./pages/Chat";
import Register from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
