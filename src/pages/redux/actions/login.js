import axios from "axios";
import { Next } from "react-bootstrap/esm/PageItem";
import { Navigate } from "react-router-dom";
export const loginUser = (data, navigate) => async (dispact) => {
  try {
    console.log(data);
    dispact({ type: "USER_LOGIN_PENDING" });
    const result = await axios.get(`http://localhost:3009/auth/login`, data);
    const user = result.data.data;
    console.log(user, "user");
    localStorage.setItem("token", user.token);
    dispact({ type: "USER_LOGIN_SUCCESS", payload: user });
    alert("Berhasil Login");
    navigate("/");
  } catch (err) {
    if (err.response.status === 402) {
      alert("Kamu Belum Verfikasi Akunmu,Silahkan Verifikasi terlebih dahulu");
      navigate("/auth");
    } else if (err.response.status === 404) {
      alert("Password atau email yang kamu masukan salah");
    }
  }
};
