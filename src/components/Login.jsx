import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Alert } from '@mui/material';
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
        <div className="shape shape-3"></div>
      </div>
      <Container maxWidth="sm" className="content-wrapper">
        <Paper elevation={0} className="glass-card">
          <div className="card-content">
            <Typography variant="h3" className="title-animated">
              Welcome Back
            </Typography>
            <Typography variant="subtitle1" className="subtitle-animated">
              Continue your journey with us
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleLogin}
              className="login-button-animated"
            >
              Continue with Google
            </Button>
          </div>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;