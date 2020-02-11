/* eslint-disable no-underscore-dangle */
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import amber from '@material-ui/core/colors/amber';

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Kanit", "Helvetica", "Arial", sans-serif',
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
    },

  },
  overrides: {
  },
}));

export default theme;