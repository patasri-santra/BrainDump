import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup() {
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
        <h2 className="login-heading">{isLogin ? "Log In 🔐" : "Sign Up ✍"}</h2>

        <form onSubmit={handleSubmit}>
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
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="login-toggle">
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already registered? Log in"}
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
