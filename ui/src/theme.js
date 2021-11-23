import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: ['"Gochi Hand"', "sans-serif"].join(","),
  },
  palette: {
    mode: "light",
  },
});
