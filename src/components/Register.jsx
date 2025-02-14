import React from 'react';
import { Box, Container, Typography, Button, Paper, Divider, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function Register() {
  const handleGoogleRegister = () => {
    window.location.href = '/auth/google_oauth2';
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Register
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Register for an account using Single Sign-On (SSO) with your organization account.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleGoogleRegister}
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: 'none',
              py: 1.5,
              bgcolor: 'common.white',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
          >
            Continue with Google
          </Button>

          <Box sx={{ width: '100%', my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
            </Divider>
          </Box>

          <Link 
            href="/login" 
            underline="hover"
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Login here
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;