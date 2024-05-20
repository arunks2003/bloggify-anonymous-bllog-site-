// src/Login.js
import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/configireFirebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: email,
        password: password,
        loggedIn: true,
      })
    );
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/create-post");
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            email: email,
            password: password,
            loggedIn: true,
          })
        );
        localStorage.setItem("loggedIn", true);
      })
      .then(navigate("/"));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-button"
          style={{ background: "#0f1010" }}
          type="submit"
        >
          Login
        </button>
        <button
          className="google-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google icon"
          />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
