import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import SearchBar from "../SearchBar/searchbar";
import { BackgroundMusic } from "../BackgroundMusic/Backgroundmusic";
import { Button, Collapse } from "react-bootstrap";

interface User {
  email: string | null;
  id: string | null;
}

function NavBar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          id: user.uid,
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOutFirebase = () => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => {
        console.log("Sign out successful");
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };
  
  return (
    <div className="navstyle">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <p>Anime Watch List</p>
  <img
    src="https://media.tenor.com/1vO9SJVU1U0AAAAM/nezuko-cham.gif"
    alt="Logo"
    style={{ height: "50px", marginRight: "10px" }}
  />

          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Collapse in={isNavOpen} className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      onClick={handleSignOutFirebase}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <SearchBar />
              </li>
              <li></li>
              <br></br>
               <li className="nav-item">
              <BackgroundMusic/>
              </li> 
            </ul>
          </Collapse>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
