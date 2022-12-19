import axios from "axios";
import { Next } from "react-bootstrap/esm/PageItem";
import { Navigate } from "react-router-dom";

export const loginUser = (data, navigate) => async (dispacth) => {
  try {
    console.log(data);
    dispacth({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(`http://localhost:3009/auth/login`, data);
    const user = result.data.data;
    console.log(user, "user");
    localStorage.setItem("token", user.token);
    const userName = user.username;
    localStorage.setItem("userName", userName);
    // socket.emit("newUser", { userName, socketID: socket.id });

    // localStorage.setItem("userName", user.username);
    dispacth({ type: "USER_LOGIN_SUCCESS", payload: user });
    alert("Berhasil Login");
    navigate("/join");
  } catch (err) {
    console.log(err);
  }
};
