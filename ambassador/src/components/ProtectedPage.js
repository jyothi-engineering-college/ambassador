import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs, // Import addDoc to add data to Firestore
} from "firebase/firestore";
import './pstyle.css';
import Man from './img/man.svg';
import College from './img/clg.png';
import Thara from './img/image 3.png';
import 'animate.css';

function ProtectedPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState(null);
  const [additionalUserData, setAdditionalUserData] = useState(null);

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

  
  return (
    <div className="motham animate__animated animate__slideInLeft">
      {additionalUserData && (
      <div className="appuram">
        <img src={Man} alt="man"></img>
        <p className="hwdy">Howdy,</p>
          <p className="aalname">{additionalUserData.name}</p>
          <button className="plog" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div className="wrap">
        <div className="clgs">
          <img src={College} alt="college"/>
          <img src={Thara} alt="Tharang"/>
        </div>
      <h2 className="heading">Campus Ambassador Manager</h2>
      <div className="varaa"></div>
      {additionalUserData && (
        <div>
          <div className="detsub">
        <div className="det">
          <p className="kunj">Email</p>
          {user && (
          <p className="valth">{userEmail}</p>
          )}
        </div>
        <div className="det">
        <p className="kunj">College</p>
        <p className="valth">{additionalUserData.college}</p>
      </div></div>
      <div className="detsub">
      <div className="det">
        <p className="kunj">Referral ID</p>
        <p className="valth">{additionalUserData.refid}</p>
      </div>
      <div className="det">
        <p className="kunj">Points</p>
        <p className="valth">{additionalUserData.point}</p>
      </div></div>
      </div>
      )}
      
      
      <p className="heading">Leaderboard Updates</p>
      <div className="varaa"></div>
      <div className="kanak">
  <table id="customers">
    <tr>
      <th>Sl No.</th>
      <th>Name</th>
      <th>College</th>
      <th>Points</th>
    </tr>
    {data.map((item, index) => (
      <tr key={index}>
        <td>{item.no}</td>
        <td>{item.name}</td>
        <td>{item.college}</td>
        <td>{item.point}</td>
      </tr>
    ))}
  </table>
</div>

</div>
    </div>
  );
}
export default ProtectedPage;
