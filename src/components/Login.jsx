import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import config from '../../config';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || '/dashboard';
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate(fromPath + (source ? `?source=${source}` : ''), { replace: true });
    }
  }, [navigate, fromPath, source]);

  const handleLogin = () => {
    // Redirect to SSO login URL
    window.location.href = `${config.apiBaseUrl}/auth/google_oauth2`;
  };

  return (
    <Box className="login-container">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      <Box className="glass-card">
        <Box className="card-content">
          <Typography variant="h4" className="title-animated">
            Public Opinion Survey
          </Typography>
          <Typography variant="subtitle1" className="subtitle-animated">
            Sign in to continue
          </Typography>
          <Typography variant="body2" className="info-text">
            Our survey application allows you to create, distribute, and analyze surveys with ease. 
            Sign in to start creating surveys and collecting valuable feedback.
          </Typography>
          <Button
            variant="contained"
            className="login-button-animated"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
          >
            Login with Google
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;