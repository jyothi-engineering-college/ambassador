import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc, // Import addDoc to add data to Firestore
} from "firebase/firestore";
import './pstyle.css';

function ProtectedPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState(null);
  const [additionalUserData, setAdditionalUserData] = useState(null);
  const [name, setName] = useState(""); // State for the Name field
  const [movie, setMovie] = useState(""); // State for the Movie field
  const [username, setUsername] = useState(""); // State for the Username field

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        setUserEmail(user.email || "");
        fetchAdditionalUserData(user.uid);
      }
    });

    const fetchData = async () => {
      const db = getFirestore();
      const dataCollection = collection(db, "common");

      try {
        const querySnapshot = await getDocs(dataCollection);
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data from Firestore", error);
      }
    };

    fetchData();

    return () => unsubscribe();
  }, [navigate]);

  const fetchAdditionalUserData = async (uid) => {
    const db = getFirestore();
    const userCollection = collection(db, "users");

    try {
      const querySnapshot = await getDocs(userCollection);
      querySnapshot.forEach((doc) => {
        if (doc.id === uid) {
          setAdditionalUserData(doc.data());
        }
      });
    } catch (error) {
      console.error("Error fetching additional user data from Firestore", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Sorry, Logout Failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    // Create a new document in the "musics" collection with Name, Movie, and Username fields
    const db = getFirestore();
    const musicsCollection = collection(db, "musics");

    try {
      await addDoc(musicsCollection, {
        Name: name,
        Movie: movie,
        Username: username, // Include the Username field
      });

      // Clear the form fields after successful submission
      setName("");
      setMovie("");
      setUsername("");

      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data to Firestore", error);
      alert("Data submission failed!");
    }
  };

  return (
    <div>
      <h2 className="heading">Virtuosi Music Band Systems</h2>
      {additionalUserData && (
        <div className="logss">
          <p className="howd">Howdy, {additionalUserData.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {additionalUserData && (
        <div>
          <p><b>About Me</b></p>
          {user && (
          <p>Email : {userEmail}</p>
          )}
          <p>College : {additionalUserData.college}</p>
          <p>referral Id : {additionalUserData.refid}</p>
        </div>
      )}
      <p className="fnc">Common Financial Updates</p>
      {data.map((item, index) => (
        <div className="kanak" key={index}>
          <p><b>Name:</b><br></br>{item.name}</p>
          <p><b>College:</b><br></br>{item.college}</p>
        </div>
      ))}
      
      {/* Add a form to submit data to Firestore */}
      <form onSubmit={handleSubmit}>
        <h3>Submit Music Data</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Movie:</label>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProtectedPage;
