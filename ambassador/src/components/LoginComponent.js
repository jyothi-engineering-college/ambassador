import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import getAuth and signInWithEmailAndPassword
import './login.css';
import loginpadam from './img/loginpadam.svg';

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const authInstance = getAuth(); // Initialize auth instance
    try {
      await signInWithEmailAndPassword(authInstance, email, password); // Sign in with email and password
      // User successfully logged in, you can now redirect to the protected page.
      navigate("/protected");
    } catch (error) {
        alert("Sorry, Invalid Username or Password !");
      // Handle and display the error to the user, if needed
    }
  };

  return (
    <div>
    <div className="loginman">
      <div className="padam">
        <img className="lopa" src={loginpadam} alt="login"></img>
      </div>
    <div className="worker">
      <h2>Get Started with Tharang 23</h2>
      <div className="vara"></div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button onClick={handleLogin}>Login</button>
    </div></div>
    <p><center>Welcome to Tharang 23 2.0 Dashboard</center></p>
    </div>
  );
}

export default LoginComponent;
