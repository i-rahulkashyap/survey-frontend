import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import config from '../../config';

const SurveyTracking = ({ surveyId }) => {
  const [responseRate, setResponseRate] = useState(null);

  useEffect(() => {
    const fetchResponseRate = async () => {
      const response = await fetch(`${config.apiBaseUrl}/surveys/${surveyId}/track`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setResponseRate(data.response_rate);
    };

    fetchResponseRate();
  }, [surveyId]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Survey Response Rate
          </Typography>
          {responseRate !== null ? (
            <Typography variant="body1">
              Response Rate: {responseRate.toFixed(2)}%
            </Typography>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SurveyTracking;