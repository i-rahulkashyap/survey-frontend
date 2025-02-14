import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Paper, Typography, Divider } from '@mui/material';
import config from '../../config';

const SurveyResponses = () => {
  const { surveyId, responseId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.apiBaseUrl}/surveys/${surveyId}/responses/${responseId}/answers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch answers');
        }

        const data = await response.json();
        setAnswers(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching answers:', err);
      } finally {
        setLoading(false);
      }
    };

    if (surveyId && responseId) {
      fetchAnswers();
    }
  }, [surveyId, responseId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
          <Typography variant="h4" gutterBottom component="h1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Survey Responses
          </Typography>

          {answers.map((answer, index) => (
            <Box 
              key={answer.id} 
              sx={{
                p: 2,
                position: 'relative',  // Ensures proper alignment
                transition: 'background-color 0.2s',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&::after': index < answers.length - 1 ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  borderBottom: '2px dotted grey', // Always visible
                } : {},
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: '600' }}>
                Question: {answer.attributes.question_text}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Answer: {answer.attributes.text_value || answer.attributes.file_url}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default SurveyResponses;
