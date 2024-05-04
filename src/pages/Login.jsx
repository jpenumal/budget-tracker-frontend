import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        ...inputValue,
      });
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("budget-access-token", token);
        navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error?.response?.data?.message);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <div className="container">
      <div className="background-image" aria-hidden="true"></div>
      <div className="form-box">
        <h1>Login</h1>
        <div className="body-form">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <label htmlFor="email" style={{ paddingLeft: "20px" }}>
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="password" style={{ paddingLeft: "20px" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleOnChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              Login
            </button>
            <div className="message">
              <span>
                Already have an account? <Link to={"/signup"}>Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
