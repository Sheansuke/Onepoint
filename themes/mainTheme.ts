import { createTheme } from '@mui/material'

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#14b8a6',
      '50': '#F0FDFA',
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
      main: '#0f172a',
      '50': '#f8fafc',
      '100': '#f1f5f9',
      '200': '#e2e8f0',
      '300': '#cbd5e1',
      '400': '#94a3b8',
      '500': '#64748b',
      '600': '#475569',
      '700': '#334155',
      '800': '#1e293b',
      '900': '#0f172a'
    },
    error: {
      main: '#ef4444',
      '50': '#fef2f2',
      '100': '#fee2e2',
      '200': '#fecaca',
      '300': '#fca5a5',
      '400': '#f87171',
      '500': '#ef4444',
      '600': '#dc2626',
      '700': '#b91c1c',
      '800': '#991b1b',
      '900': '#7f1d1d'
    },
    info: {
      main: '#f59e0b',
      '50': '#fffbeb',
      '100': '#fef3c7',
      '200': '#fde68a',
      '300': '#fcd34d',
      '400': '#fbbf24',
      '500': '#f59e0b',
      '600': '#d97706',
      '700': '#b45309',
      '800': '#92400e',
      '900': '#78350f'
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif'
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
          backgroundColor: 'white'
          // height: 60
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#0F172A'
        },
        h1: {
          fontSize: 30,
          fontWeight: 'semi-bold'
        },
        h2: {
          fontSize: 20,
          fontWeight: 'regular'
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 'regular'
        },
        paragraph: {
          fontSize: 15,
          fontWeight: 'lighter'
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
