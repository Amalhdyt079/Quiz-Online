import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
// import './LoginForm.css';


const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Account does not exist");
      } else {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
