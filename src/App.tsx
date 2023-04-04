import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Gist from "./Gist";
import { makeGetRequest } from "./request";
import { Pagination } from "./Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [gists, setGists] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchGists = (pageNumber) => {
    // TODO: Handle errors (ie. user not exists, etc)
    setLoading(true);
    const endpoint = !!searchText
      ? `https://api.github.com/users/${searchText}/gists`
      : `https://api.github.com/gists/public`;

    makeGetRequest(endpoint, { page: pageNumber, per_page: 9 })
      .then((response) => {
        const gists = response.data;
        setGists(gists);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchGists(currentPage);
  }, [currentPage]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value.trim());
  };

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    fetchGists(currentPage);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  const handlePreviousPageButtonClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageButtonClick = () => {
    setCurrentPage(currentPage + 1);
  };

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
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Box sx={{ display: "flex", my: 6 }}>
              <TextField
                label="Enter a username"
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchInputKeyDown}
              />
              <Button variant="contained" onClick={handleSearchButtonClick}>
                Search Gists
              </Button>
            </Box>
          </Grid>
        </Grid>

        {loading && <LinearProgress />}
        <Grid container spacing={2}>
          {gists.map((gist: any) => (
            <Grid key={gist.id} item xs={12} md={4}>
              <Gist gist={gist} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            currentPage={currentPage}
            onNextPage={handleNextPageButtonClick}
            onPreviousPage={handlePreviousPageButtonClick}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
