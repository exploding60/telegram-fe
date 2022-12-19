import style from "./register.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  return (
    <>
      <div className={style.body}>
        <div className={style.formbox}>
          <h5 className="color-blue text-center">Login</h5>
          <p>Hi,Welcome Back</p>
          <div className="row">
            <label className="form-label text-secondary mb-2">Email</label>
            <input type="email" name="email" className={style.inputauth} />
            <label className="form-label text-secondary m">Password</label>
            <input
              className={style.inputauth}
              type="password"
              name="password"
            />
          </div>
          <div className="d-flex justify-content-end mt-4">Forgot Password</div>
          <button
            type="submit"
            className="btn w-100 text-white p-3 rounded-pill mt-3"
            style={{ backgroundColor: "#7E98DF" }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
