import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import './pstyle.css';

function ProtectedPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Store fetched data from Firestore
  //const [balanceData, setBalanceData] = useState([]); // Store fetched balance data
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState(null);
  const [additionalUserData, setAdditionalUserData] = useState(null); // Store additional user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        setUserEmail(user.email || "");
        // Fetch additional user data from Firestore based on user's UID
        fetchAdditionalUserData(user.uid);
        // Fetch balance data from Firestore
        //fetchBalanceData();
      }
    });

    // Fetch data from Firestore
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
    // Fetch additional user data from Firestore based on user's UID
    const db = getFirestore();
    const userCollection = collection(db, "users"); // Replace with your Firestore user collection name

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

  /*const fetchBalanceData = async () => {
    // Fetch balance data from Firestore
    const db = getFirestore();
    const balanceCollection = collection(db, "balance"); // Replace with your Firestore "balance" collection name

    try {
      const querySnapshot = await getDocs(balanceCollection);
      const fetchedBalanceData = [];
      querySnapshot.forEach((doc) => {
        fetchedBalanceData.push(doc.data());
      });
      setBalanceData(fetchedBalanceData);
    } catch (error) {
      console.error("Error fetching balance data from Firestore", error);
    }
  };*/

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Sorry, Logout Failed!");
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
      {/* Display additional user data */}
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
      {/* Display data from Firestore */}
      {data.map((item, index) => (
        <div className="kanak" key={index}>
          
          <p><b>Name:</b><br></br>{item.name}</p>
          <p><b>College:</b><br></br>{item.college}</p>
          
        </div>
      ))}

     
    </div>
  );
}

export default ProtectedPage;
