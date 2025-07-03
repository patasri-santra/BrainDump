import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "signup";
    const requestData = { name, password };

    try {
      setLoading(true);
      const res = await axios.post(`/api/users/${endpoint}`, requestData);

      if (isLogin) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(res.data.user || { name }));
        if (setIsAuthenticated) setIsAuthenticated(true);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Signup successful! Now log in.");
        setIsLogin(true);
        setName("");
        setPassword("");
      }
    } catch (err) {
      console.error("AUTH ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-box">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div className="login-heading">{isLogin ? "LOGIN" : "SIGN UP"}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            autoComplete="current-password"
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="login-toggle"
          style={{ cursor: "pointer" }}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already registered? Log in"}
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;