import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { Box, Container, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

const AttemptSurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [attemptedSurveys, setAttemptedSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      const response = await fetch(`${config.apiBaseUrl}/surveys`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setSurveys(data.data); // Assuming JSON:API format, adjust if needed
    };

    const fetchAttemptedSurveys = async () => {
      const response = await fetch(`${config.apiBaseUrl}/attempted_surveys`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setAttemptedSurveys(data.data.map(survey => survey.id)); // Assuming JSON:API format, adjust if needed
    };

    fetchSurveys();
    fetchAttemptedSurveys();
  }, []);

  const handleAttemptSurvey = (id) => {
    if (attemptedSurveys.includes(id)) {
      alert("You have already attempted this survey.");
      return;
    }
    navigate(`/surveys/${id}/take`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Available Surveys
          </Typography>

          <List>
            {surveys.map((survey) => (
              <ListItem key={survey.id} divider>
                <ListItemText
                  primary={survey.attributes.title} // Assuming JSON:API format, adjust if needed
                  secondary={survey.attributes.description} // Assuming JSON:API format, adjust if needed
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAttemptSurvey(survey.id)}
                  >
                    Attempt
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default AttemptSurveyList;