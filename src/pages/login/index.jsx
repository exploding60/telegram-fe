import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/login";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <h3 className="text-center" style={{ color: "#7e98df" }}>
            Login
          </h3>
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

          <Link to="/register">
            <p className="text-center mt-5">
              Dont Have Account?<span>Sign-up here</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
