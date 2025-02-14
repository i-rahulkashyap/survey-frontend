import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import config from '../../config';
import axios from 'axios';

const SurveyDistribution = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use an object to hold emails per survey (key: survey id)
  const [emailsMap, setEmailsMap] = useState({});
  // Use an object to hold messages per survey after distribution
  const [messagesMap, setMessagesMap] = useState({});

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.apiBaseUrl}/surveys`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Adjust based on the actual response structure (assumed JSON:API)
        setSurveys(response.data.data);
      } catch (err) {
        console.error('Error fetching surveys:', err);
        setError('Failed to load surveys.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleEmailChange = (surveyId, value) => {
    setEmailsMap(prev => ({ ...prev, [surveyId]: value }));
  };

  const handleDistribute = async (surveyId) => {
    const emailsString = emailsMap[surveyId] || "";
    const emails = emailsString.split(',')
      .map(email => email.trim())
      .filter(email => email);
    try {
      const response = await fetch(`${config.apiBaseUrl}/surveys/${surveyId}/distribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ emails }),
      });
      const data = await response.json();
      setMessagesMap(prev => ({ ...prev, [surveyId]: data.message }));
    } catch (err) {
      console.error(`Error distributing survey ${surveyId}:`, err);
      setMessagesMap(prev => ({ ...prev, [surveyId]: 'Distribution failed.' }));
    }
  };

  if (loading) {
    return <Typography>Loading surveys...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Distribute Survey
          </Typography>
          <List>
            {surveys.map((survey) => (
              <ListItem key={survey.id} divider>
                <ListItemText
                  primary={survey.attributes.title} 
                  secondary={survey.attributes.description}
                />
                <ListItemSecondaryAction>
                  <TextField
                    label="Emails (comma separated)"
                    variant="outlined"
                    size="small"
                    value={emailsMap[survey.id] || ''}
                    onChange={(e) => handleEmailChange(survey.id, e.target.value)}
                    sx={{ mr: 1, width: '250px' }}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleDistribute(survey.id)}>
                    Distribute
                  </Button>
                  {messagesMap[survey.id] && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {messagesMap[survey.id]}
                    </Typography>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default SurveyDistribution;