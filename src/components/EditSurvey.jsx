import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';
import CreateSurvey from './CreateSurvey';
import config from '../../config';

function EditSurvey() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/surveys/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch survey data');
        }

        const data = await response.json();
        setSurvey(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2, mt: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>Loading survey...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Survey
        </Typography>
        <CreateSurvey initialData={survey} isEditing={true} surveyId={id} />
      </Paper>
    </Container>
  );
}

export default EditSurvey;
