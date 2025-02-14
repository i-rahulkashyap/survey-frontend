import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, IconButton } from "@mui/material";
import config from '../../config';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListIcon from '@mui/icons-material/List';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShareIcon from '@mui/icons-material/Share';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${config.apiBaseUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCreateSurvey = () => {
    navigate("/surveys/new");
  };

  const handleViewSurveys = () => {
    navigate("/surveys");
  };

  const handleAttemptSurvey = () => {
    navigate("/surveys/attempt");
  };

  const handleViewAttemptedSurveys = () => {
    navigate("/attempted_surveys");
  };

  const handleDistributeSurvey = (surveyId) => {
    navigate(`/surveys/${surveyId}/distribute`);
  };

  const handleTrackSurvey = (surveyId) => {
    navigate(`/surveys/${surveyId}/track`);
  };

  const stats = [
    { icon: <TrendingUpIcon />, label: "Active Surveys", value: "12" },
    { icon: <PeopleIcon />, label: "Total Responses", value: "1,234" },
    { icon: <CheckCircleIcon />, label: "Completion Rate", value: "78%" },
  ];

  return (
    <Box className="dashboard-container">
      <Paper elevation={3} className="main-paper">
        <div className="user-info">
          <Typography variant="h5" className="welcome-text">
            Welcome back, {user ? user.email : "User"}!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's an overview of your survey activities
          </Typography>
        </div>

        {/* Stats Section */}
        <Grid container spacing={3} className="stats-container">
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} className="action-cards-container">
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <CreateIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                Create a Survey
              </Typography>
              <Typography variant="body2" className="card-description">
                Start creating surveys with various question types
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleCreateSurvey}
                className="action-button"
              >
                Create Survey
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <VisibilityIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                View My Surveys
              </Typography>
              <Typography variant="body2" className="card-description">
                Access and manage your created surveys
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleViewSurveys}
                className="action-button"
              >
                My Surveys
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <AssignmentIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                Attempt Survey
              </Typography>
              <Typography variant="body2" className="card-description">
                Browse and attempt available surveys
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleAttemptSurvey}
                className="action-button"
              >
                Attempt Survey
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <ListIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                View Attempted
              </Typography>
              <Typography variant="body2" className="card-description">
                View all the surveys you have attempted
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleViewAttemptedSurveys}
                className="action-button"
              >
                Attempted Surveys
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <ShareIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                Distribute Survey
              </Typography>
              <Typography variant="body2" className="card-description">
                Share your survey with a targeted audience
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate("/surveys/distribute")}
                className="action-button"
              >
                Distribute Survey
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className="action-card">
              <TrackChangesIcon className="action-icon" />
              <Typography variant="h6" className="card-title">
                Track Survey
              </Typography>
              <Typography variant="body2" className="card-description">
                Monitor the response rate of your survey
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => handleTrackSurvey(1)} // Replace 1 with actual survey ID
                className="action-button"
              >
                Track
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <div className="recent-activity">
          <Typography variant="h5" className="section-title">
            Recent Activity
          </Typography>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <Typography variant="body1">Created "Customer Feedback Survey"</Typography>
                <Typography variant="body2" color="textSecondary">2 hours ago</Typography>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <Typography variant="body1">Distributed "Product Satisfaction Survey"</Typography>
                <Typography variant="body2" color="textSecondary">1 day ago</Typography>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <Typography variant="body1">Analyzed "Service Quality Survey"</Typography>
                <Typography variant="body2" color="textSecondary">3 days ago</Typography>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default Dashboard;