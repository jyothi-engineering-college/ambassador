import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    const authInstance = getAuth();
    const db = getFirestore();

    try {
      // Create a new user in Firebase Authentication
      const authResult = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      // Create a document in Firestore for the user
      const user = authResult.user;
      const usersCollection = collection(db, "users");
      const userDocRef = doc(usersCollection, user.uid);

      // Store user's name, college, and email in Firestore
      await setDoc(userDocRef, {
        name,
        college,
        email,
        // Add other user-related data here
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="College"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />
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
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default Register;
