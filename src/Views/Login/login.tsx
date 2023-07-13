import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const defaultTheme = createTheme();

export default function Login({ setIsUserSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignInWithGoogle = () => {
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(authInstance, provider)
      .then((result) => {
        const user = result.user;
        setIsUserSignedIn(true);
        setMessage("Successfully Signed in");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign in with Google error:", error);
        setMessage("Google sign in Error");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsUserSignedIn(true);
        setMessage("Successfully Signed in!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign in error:", error);
        setMessage("Error signing in");
      });
      setTimeout(() => {
        setMessage('');
      }, 2000);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://e1.pxfuel.com/desktop-wallpaper/254/57/desktop-wallpaper-aesthetic-anime-backgrounds-clean-anime.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSignInWithGoogle}
              >
                Sign In with Google
              </Button>

              {message && <p style={{ fontWeight: "bold" }}>{message}</p>}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box> 
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
