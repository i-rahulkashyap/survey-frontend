import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Grid, IconButton } from '@mui/material';
import config from '../../config';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreateSurvey = ({ isEditing = false }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [questions, setQuestions] = useState([{ text: '', question_type: 'multiple_choice', options: [''] }]);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
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
          setTitle(data.title);
          setDescription(data.description);
          setTheme(data.theme);
          setQuestions(data.questions);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSurvey();
    }
  }, [isEditing, id]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', question_type: 'multiple_choice', options: [''] }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionTypeChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question_type = event.target.value;
    if (event.target.value !== 'multiple_choice') {
      newQuestions[index].options = [];
    } else {
      newQuestions[index].options = [''];
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const surveyData = {
      survey: {
        title,
        description,
        theme,
        questions_attributes: questions,
      },
    };

    const url = isEditing ? `${config.apiBaseUrl}/surveys/${id}` : `${config.apiBaseUrl}/surveys`;
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(surveyData),
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.error('Failed to save survey');
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading survey...</Typography>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Edit Survey' : 'Create a New Survey'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Survey Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Theme"
            fullWidth
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            sx={{ mb: 2 }}
          />
          {questions.map((question, questionIndex) => (
            <Grid container spacing={2} key={questionIndex} sx={{ mb: 2 }} className="question-section">
              <Grid item xs={10} className="option-section">
                <TextField
                  label={`Question ${questionIndex + 1}`}
                  fullWidth
                  value={question.text}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                  required
                />
              </Grid>
              <Grid item xs={2} className="option-section">
                <IconButton onClick={() => handleRemoveQuestion(questionIndex)} color="error">
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} className="option-section">
                <TextField
                  label="Question Type"
                  select
                  fullWidth
                  value={question.question_type}
                  onChange={(e) => handleQuestionTypeChange(questionIndex, e)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="short_answer">Short Answer</option>
                  <option value="true_false">True/False</option>
                  <option value="fill_in_the_blanks">Fill in the Blanks</option>
                  <option value="image_upload">Image Upload</option>
                  <option value="file_upload">File Upload</option>
                </TextField>
              </Grid>
              {question.question_type === 'multiple_choice' && (
                <Grid item xs={12} className="option-section">
                  <Typography variant="h6">Options</Typography>
                  {question.options.map((option, optionIndex) => (
                    <Grid container spacing={1} key={optionIndex}>
                      <Grid item xs={10}>
                        <TextField
                          label={`Option ${optionIndex + 1}`}
                          fullWidth
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                          required
                        />
                      </Grid>
                      <Grid item xs={2} className="option-section">
                        <IconButton onClick={() => handleRemoveOption(questionIndex, optionIndex)} color="error">
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button variant="outlined" onClick={() => handleAddOption(questionIndex)} startIcon={<AddIcon />} sx={{ mt: 1 }}>
                    Add Option
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
          <Button variant="outlined" onClick={handleAddQuestion} startIcon={<AddIcon />} sx={{ mb: 2 }}>
            Add Question
          </Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Save Changes' : 'Create Survey'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateSurvey;