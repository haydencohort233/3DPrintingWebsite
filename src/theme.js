import { createTheme } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Oswald, sans-serif',
    h2: {
      fontWeight: 900,
    },
    h5: {
      fontWeight: 500,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: blue[500],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
