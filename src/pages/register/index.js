import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import { Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();
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
        "http://localhost:3009/users/register",
        user
      );

      alert("Success", "Register Success", "success");
      Navigate("/");
    } catch (err) {
      console.log(err.response.status);
      alert("Warning", "Email Already Registered", "error");
      Navigate("/");
    }
  };
  return (
    <>
      <div className={style.body}>
        <div className={style.formbox}>
          <h3 className="text-center" style={{ color: "#7e98df" }}>
            Register
          </h3>
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

            <button
              type="submit"
              className="btn w-100 text-white p-3 rounded-pill mt-3 mt-5"
              style={{ backgroundColor: "#7E98DF" }}
            >
              Register
            </button>
          </form>
          <Link to="/register">
            <p className="text-center mt-5">
              Already had Account?<span>Login</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
