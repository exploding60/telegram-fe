import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import { Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await axios.post(
        "http://localhost:3009/auth/register",
        user
      );

      alert("Success", "Register Success", "success");
      Navigate("/auth/login");
    } catch (err) {
      console.log(err.response.status);
      alert("Warning", "Email Already Registered", "error");
      Navigate("/auth/login");
    }
  };
  return (
    <>
      <div className={style.body}>
        <div className={style.formbox}>
          <h5 className="color-blue text-center">Register</h5>
          <p>Register</p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label className="form-label text-secondary mb-2">Fullname</label>
              <input
                type="text"
                name="username"
                className={style.inputauth}
                onChange={handleChange}
              />
              <label className="form-label text-secondary mb-2">Email</label>
              <input
                type="email"
                name="email"
                className={style.inputauth}
                onChange={handleChange}
              />
              <label className="form-label text-secondary m">Password</label>
              <input
                className={style.inputauth}
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              Forgot Password
            </div>
            <button
              type="submit"
              className="btn w-100 text-white p-3 rounded-pill mt-3"
              style={{ backgroundColor: "#7E98DF" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
