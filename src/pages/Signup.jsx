import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, password, name } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/signup", {
        ...inputValue,
      });
      const { success, message } = data;
      if (success) {
        handleSuccess("User created successfully!");
        navigate("/login");
      } else {
        handleError(message);
      }
    } catch (error) {}
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="container">
      <div className="background-image"></div>

      <div className="form-box">
        <h1>Sign up</h1>
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
                value={email}
                id="email"
                placeholder="Enter Email"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="name" style={{ paddingLeft: "20px" }}>
                Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                id="name"
                placeholder="Enter Name"
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
                name="password"
                id="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-block">
              Sign up
            </button>
            <div className="message">
              <span>
                Already have an account? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
