import { ThemeOptions } from '@mui/material';
import { blue } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    secondaryInvert: Palette['primary'];
    textInput: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    secondaryInvert?: PaletteOptions['primary'];
    textInput?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    secondaryInvert: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    textInput: true;
  }
}

declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    textInput: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    textInput: true;
  }
}

const BaseTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          padding: '0.8rem 2rem 0.8rem 2rem',
          borderRadius: '4rem',
          textTransform: 'none',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#E6BCBC',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: '2px',
          borderColor: '#E6BCBC',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          padding: '1rem',
          backgroundColor: '#392B2B',
          borderRadius: '1rem',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'textInput',
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#201A1A',
      default: '#201A1A',
    },
    text: {
      primary: '#FFDADB',
    },
    primary: {
      main: '#5D3F3F',
      dark: '#604646',
      contrastText: '#FFDAD9',
    },
    secondary: {
      main: '#EEBF78',
      dark: '#f1c98b',
      contrastText: '#442B00',
    },
    secondaryInvert: {
      main: '#604003',
      dark: '#644406',
      contrastText: '#FFDDAB',
    },
    tertiary: {
      main: '#FFB3B6',
      dark: '#f5bbbd',
      contrastText: '#5F131C',
    },
    textInput: {
      main: '#E6BCBC',
      contrastText: '#E6BCBC',
    },
  },
};

export default BaseTheme;
