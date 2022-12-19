import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/login";
import { Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postData = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    let data = {
      email,
      password,
    };
    dispatch(loginUser(data, navigate));
  };
  return (
    <div>
      <div className={style.body}>
        <div className={style.formbox}>
          <h5 className="color-blue text-center">Login</h5>
          <p>Hi,Welcome Back</p>

          <Form onSubmit={postData}>
            <div className="row">
              <label className="form-label text-secondary mb-2">Email</label>
              <input
                type="email"
                name="email"
                className={style.inputauth}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="form-label text-secondary m">Password</label>
              <input
                className={style.inputauth}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
