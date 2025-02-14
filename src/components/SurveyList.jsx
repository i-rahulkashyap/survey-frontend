import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box, Container, Paper, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import config from '../../config';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${config.apiBaseUrl}/surveys`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }); 
        setSurveys(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surveys:', error.response ? error.response.data : error.message);
        setError('Failed to load surveys.');
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return <Typography>Loading surveys...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleDeleteSurvey = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this survey?");
    if (confirmDelete) {
        try {
            await axios.delete(`${config.apiBaseUrl}/surveys/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSurveys(surveys.filter(survey => survey.id !== id)); // Update state to remove deleted survey
            console.log(`Deleted survey with id: ${id}`);
        } catch (error) {
            console.error('Error deleting survey:', error.response ? error.response.data : error.message);
            alert('Failed to delete survey.');
        }
    }
  }; 

  const handleEditSurvey = async (id) => {
    try {
      // First fetch the survey details to make sure it exists and user has access
      const response = await axios.get(`${config.apiBaseUrl}/surveys/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      // If survey exists, navigate to edit page
      if (response.data) {
        navigate(`/surveys/${id}/edit`, { 
          state: { survey: response.data.data } // Pass survey data to edit page
        });
      }
    } catch (error) {
      console.error('Error accessing survey:', error.response ? error.response.data : error.message);
      alert('Unable to edit survey. Please try again.');
    }
  };
  
  const handleTakeSurvey = async (id) => {
    try {
      // Check if survey is available/active before navigating
      const response = await axios.get(`${config.apiBaseUrl}/surveys/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      // If survey exists and is active, navigate to take survey page
      if (response.data && response.data.data.attributes.status === 'active') {
        navigate(`/surveys/${id}/take`, {
          state: { survey: response.data.data }
        });
      } else {
        alert('This survey is not currently available.');
      }
    } catch (error) {
      console.error('Error accessing survey:', error.response ? error.response.data : error.message);
      alert('Unable to access survey. Please try again.');
    }
  };
  
  const handleAddSurvey = () => {
    navigate('/surveys/new');
  };


  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom component="h1">
            Survey List
          </Typography>

          <List>
            {surveys.map((survey) => (
              <ListItem key={survey.id} divider className="question-section" >
                <ListItemText
                  primary={survey.attributes.title} // Assuming JSON:API format, adjust if needed
                  secondary={survey.attributes.description} // Assuming JSON:API format, adjust if needed
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="take" onClick={() => handleTakeSurvey(survey.id)} >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditSurvey(survey.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSurvey(survey.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleAddSurvey}>
            <AddIcon />
          </Fab>
        </Paper>
      </Container>
    </Box>
  );
}

export default SurveyList;