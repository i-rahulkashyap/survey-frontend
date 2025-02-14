import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Grid, TextField } from '@mui/material';
import config from '../../config';

const SurveyTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        console.log('Fetching survey with ID:', id);
        const response = await fetch(`${config.apiBaseUrl}/surveys/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch survey: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received survey data:', data);
        
        // Check if data.data exists (for FastJSON API format)
        const surveyData = data.data ? data.data.attributes : data;
        
        if (!surveyData) {
          throw new Error('Invalid survey data format received');
        }
        
        setSurvey(surveyData);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchSurvey:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  const handleResponseChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/surveys/${id}/take`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          responses: {
            user_id: 1, // Optional, if you want to associate a user
            answers_attributes: Object.entries(responses).map(([questionId, textValue]) => ({
              question_id: questionId,
              text_value: textValue,
            })),
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit responses');
      }
  
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting responses:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography>Loading survey...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!survey) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography color="error">No survey data available</Typography>
      </Box>
    );
  }

  // Debug log to check survey structure
  console.log('Rendering survey:', survey);
  console.log('Survey questions:', survey.questions);

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {survey.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {survey.description}
        </Typography>
        <form onSubmit={handleSubmit}>
          {Array.isArray(survey.questions) ? (
            survey.questions.map((question) => (
              <Grid container spacing={2} key={question.id} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="h6">{question.text}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {question.question_type === 'multiple_choice' && (
                    question.options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            onChange={() => handleResponseChange(question.id, option)}
                          />
                          {option}
                        </label>
                      </div>
                    ))
                  )}
                  {question.question_type === 'short_answer' && (
                    <TextField
                      fullWidth
                      onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                  )}
                  {question.question_type === 'true_false' && (
                    <>
                      <label>
                        <input
                          type="radio"
                          name={question.id}
                          value="True"
                          onChange={() => handleResponseChange(question.id, 'True')}
                        />
                        True
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={question.id}
                          value="False"
                          onChange={() => handleResponseChange(question.id, 'False')}
                        />
                        False
                      </label>
                    </>
                  )}
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography color="error">No questions available</Typography>
          )}
          <Button type="submit" variant="contained">
            Submit Responses
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SurveyTake;