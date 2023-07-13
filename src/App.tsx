import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./Components/NavBar/navbar";
import SignUp from "./Views/SignUp/signup";
import Login from "./Views/Login/login";
import Home from "./Views/Home/home";
import Results from "./Views/Results/results";
import Profile from "./Views/Profile/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [themeMode, setThemeMode] = useState("light");

  const handleThemeChange = (themeMode: string) => {
    setThemeMode(themeMode);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#000000", // Update with primary color for your theme
      },
      secondary: {
        main: "#ffffff", // Update with secondary color for your theme
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="app">
          <NavBar
            isUserSignedIn={isUserSignedIn}
            setIsUserSignedIn={setIsUserSignedIn}
            handleThemeChange={handleThemeChange}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={<Login setIsUserSignedIn={setIsUserSignedIn} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
