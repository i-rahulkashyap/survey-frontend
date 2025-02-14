import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Alert, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmailIcon from '@mui/icons-material/Email';
import BarChartIcon from '@mui/icons-material/BarChart';
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

      {/* Main Content */}
      <Container maxWidth="sm">
        <Box
          className="glass-card"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            p: 4,
            position: 'relative',
          }}
        >
          {/* Organization Notice */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-icon': {
                color: '#4EDFFF'
              }
            }}
          >
            This application is restricted to authorized organization users only
          </Alert>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AssessmentIcon 
              sx={{ 
                fontSize: 48, 
                color: '#4EDFFF',
                mb: 2
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                color: '#fff',
                fontWeight: 700,
                mb: 2
              }}
            >
              Public Opinion Survey
            </Typography>
          </Box>

          {/* Features Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#4EDFFF',
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Platform Features:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssessmentIcon sx={{ color: '#4EDFFF' }} />
                <Typography sx={{ color: '#fff' }}>
                  Create custom surveys with multiple question types
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: '#4EDFFF' }} />
                <Typography sx={{ color: '#fff' }}>
                  Distribute surveys via email and social media
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BarChartIcon sx={{ color: '#4EDFFF' }} />
                <Typography sx={{ color: '#fff' }}>
                  Analyze responses with advanced analytics
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            sx={{
              background: 'linear-gradient(45deg, #4EDFFF, #39FF14)',
              color: '#0f172a',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(45deg, #3bc8e7, #32e612)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Sign in with Organization Account
          </Button>

          {error && (
            <Typography 
              color="error" 
              sx={{ mt: 2, textAlign: 'center' }}
            >
              {error}
            </Typography>
          )}

          {/* Additional Information */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              mt: 3,
              textAlign: 'center'
            }}
          >
            This platform is designed for creating and managing surveys
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
