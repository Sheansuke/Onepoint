import { createTheme } from '@mui/material'

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#14b8a6',
      '100': '#ccfbf1',
      '200': '#99f6e4',
      '300': '#5eead4',
      '400': '#2dd4bf',
      '500': '#14b8a6',
      '600': '#0d9488',
      '700': '#0f766e',
      '800': '#115e59',
      '900': '#134e4a'
    },
    secondary: {
      main: '#64748b',
      '100': '#f1f5f9',
      '200': '#e2e8f0',
      '300': '#cbd5e1',
      '400': '#94a3b8',
      '500': '#64748b',
      '600': '#475569',
      '700': '#334155',
      '800': '#1e293b',
      '900': '#0f172a'
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none'
      }
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed'
      },
      styleOverrides: {
        root: {
          // backgroundColor: 'white',
          // height: 60
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#0f172a"
        },
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'primary'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 5,
          ':hover': {
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '5px'
        }
      }
    }
  }
})
