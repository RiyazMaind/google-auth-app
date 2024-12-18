// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from "./firebaseConfig";
import { AppBar, Toolbar, IconButton, Button, Avatar, Typography, Container, CssBaseline, ThemeProvider, createTheme, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/" />;
};

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const containerStyle = {
    textAlign: "center",
    marginTop: isMobile ? "20px" : "50px",
    padding: isMobile ? "10px" : "20px",
  };

  const avatarStyle = {
    margin: "20px auto",
    width: isMobile ? 60 : 100,
    height: isMobile ? 60 : 100,
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography variant={isMobile ? "h6" : "h5"}>
              Google Auth App
            </Typography>
            <Tooltip title="Toggle Theme">
              <IconButton color="inherit" onClick={toggleTheme}>
                {theme === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Container style={containerStyle}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!user ? (
              <div>
                <Typography variant={isMobile ? "h5" : "h4"}>
                  Welcome to the Google Auth App
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  style={{ marginTop: isMobile ? "10px" : "20px" }}
                >
                  Login with Google
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant={isMobile ? "h6" : "h4"}>
                  Welcome, {user.displayName}
                </Typography>
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  style={avatarStyle}
                />
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">
                  Last Login: {user.metadata.lastSignInTime}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                  style={{ marginTop: isMobile ? "10px" : "20px" }}
                >
                  Logout
                </Button>
              </div>
            )}
          </motion.div>
        </Container>
        <Routes>
          <Route path="/" element={<div />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <div>
                  <Typography variant="h5">Your Dashboard</Typography>
                  {/* Add Dashboard widgets or features here */}
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
