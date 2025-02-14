import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';
import config from '../../config';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${config.apiBaseUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          navigate("/");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Typography variant="h6" className="app-title">
          Survey App
        </Typography>
        {user && (
          <Box ml="auto" display="flex" alignItems="center">
            <Typography variant="body1" className="welcome-text">
              Welcome back, {user.email}!
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;