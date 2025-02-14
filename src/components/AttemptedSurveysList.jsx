import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { Box, Container, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

const AttemptedSurveysList = () => {
  const [attemptedSurveys, setAttemptedSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttemptedSurveys = async () => {
      const response = await fetch(`${config.apiBaseUrl}/attempted_surveys`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setAttemptedSurveys(data.data); // Adjust if needed based on the actual response format
    };

    fetchAttemptedSurveys();
  }, []);

  const handleViewAnswers = (surveyId, responseId) => {
    navigate(`/surveys/${surveyId}/responses/${responseId}/answers`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Attempted Surveys
          </Typography>

          <List>
            {attemptedSurveys.map((survey) => (
              <ListItem key={survey.id} divider>
                <ListItemText
                  primary={survey.attributes.title} // Assuming JSON:API format, adjust if needed
                  secondary={survey.attributes.description} // Assuming JSON:API format, adjust if needed
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewAnswers(survey.id, survey.attributes.response_id)}
                  >
                    View Answers
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

export default AttemptedSurveysList;