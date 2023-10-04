import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import getAuth and signInWithEmailAndPassword

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
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginComponent;
