// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F46E5', // Modern indigo
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#10B981', // Modern emerald
      light: '#34D399',
      dark: '#059669',
      contrastText: '#ffffff'
    },
    background: {
      default: '#0F172A', // Deep blue-gray
      paper: '#1E293B',
      dark: '#0F172A'
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB'
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8'
    },
    divider: 'rgba(148, 163, 184, 0.12)'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.35
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none'
        },
        contained: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 24,
          backgroundImage: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 8,
          '&:hover': {
            backgroundColor: 'rgba(148, 163, 184, 0.08)'
          }
        }
      }
    }
  }
});

export default theme;