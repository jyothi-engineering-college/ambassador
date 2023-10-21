import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './login.css';
import loginpadam from './img/tharang.png';
import 'animate.css';

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const authInstance = getAuth();
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate("/protected");
    } catch (error) {
      alert("Sorry, Invalid Username or Password!");
    }
  };

  // Function to navigate to the registration page
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="animate__animated animate__jackInTheBox">
      <div className="loginman">
        <div className="padam">
          <img className="lopa" src={loginpadam} alt="login"></img>
        </div>
        <div className="worker">
          <p className="jyo">Jyothi Engineering College</p>
          <h2>Campus Ambassador Login</h2>
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
          <div className="kliqs">
          <button onClick={handleLogin}>Login</button>
          
          {/* Button to navigate to the registration page */}
          <button onClick={navigateToRegister}>Register</button>
          </div>
        </div>
      </div>
      <p><center>Welcome to Tharang 23 2.0 Dashboard</center></p>
    </div>
  );
}

export default LoginComponent;
