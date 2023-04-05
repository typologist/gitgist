import * as React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GistList from "./GistList";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          py: 4,
        }}
      >
        <GistList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
