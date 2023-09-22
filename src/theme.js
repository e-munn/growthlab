import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFAF5',
    },
    primary: { main: '#EEFFEF', light: '#99FFA0', dark: '#111' },
  },

  typography: {
    fontFamily: ['Nunito Sans'],
    fontSize: 12,
  },
})

export default theme
