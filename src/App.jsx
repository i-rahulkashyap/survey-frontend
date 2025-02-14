import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import SurveyList from './components/SurveyList.jsx';
import CreateSurvey from './components/CreateSurvey.jsx';
import EditSurvey from './components/EditSurvey.jsx';
import SurveyTake from './components/SurveyTake.jsx';
import AttemptSurveyList from './components/AttemptSurveyList.jsx';
import AttemptedSurveysList from './components/AttemptedSurveysList.jsx';
import SurveyResponses from './components/SurveyResponses.jsx';
import SurveyDistribution from './components/SurveyDistribution.jsx';
import SurveyTracking from './components/SurveyTracking.jsx';
import NotFound from './components/NotFound';
import Layout from './components/Layout.jsx';
import './global.css';

// Protected Route wrapper
// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to login, preserve current location
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={
            localStorage.getItem("token") 
              ? <Navigate to="/dashboard" /> 
              : <Login />
          } />
          <Route path="*" element={
            <Layout>
              <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/surveys" element={
            <ProtectedRoute>
              <SurveyList />
            </ProtectedRoute>
          } />
          <Route path="/surveys/new" element={
            <ProtectedRoute>
              <CreateSurvey />
            </ProtectedRoute>
          } />
          <Route path="/surveys/:id/edit" element={
            <ProtectedRoute>
              <CreateSurvey isEditing={true} />
            </ProtectedRoute>
          } />
          <Route path="/surveys/:id/take" element={
            <ProtectedRoute>
              <SurveyTake />
            </ProtectedRoute>
          } />
          <Route path="/surveys/attempt" element={
            <ProtectedRoute>
              <AttemptSurveyList />
            </ProtectedRoute>
          } />
          <Route path="/attempted_surveys" element={
            <ProtectedRoute>
              <AttemptedSurveysList />
            </ProtectedRoute>
          } />
          <Route path="/surveys/:surveyId/responses/:responseId/answers" element={
            <ProtectedRoute>
              <SurveyResponses />
            </ProtectedRoute>
          } />
          <Route path="/surveys/distribute" element={
            <ProtectedRoute>
              <SurveyDistribution />
            </ProtectedRoute>
          } />
          <Route path="/surveys/:surveyId/track" element={
            <ProtectedRoute>
              <SurveyTracking />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;