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

function App() {
  const [gists, setGists] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);

    makeGetRequest(
      `https://api.github.com/gists/public?page=${currentPage}&per_page=10`
    )
      .then((response) => {
        const gists = response.data;
        setGists(gists);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handleSearchInputChange = (e) => setSearchText(e.target.value);

  const handleSearch = () => {
    setLoading(true);

    makeGetRequest(
      `https://api.github.com/gists/public?q=${searchText}&page=${currentPage}&per_page=10`
    )
      .then((response) => {
        const gists = response.data;
        setGists(gists);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" mb={2}>
        List of Gists
      </Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {loading && <LinearProgress />}
      <Grid container spacing={2}>
        {gists.map((gist: any) => (
          <Grid key={gist.id} item xs={12} md={6} lg={4}>
            <Gist gist={gist} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          currentPage={currentPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </Box>
    </Container>
  );
}

export default App;
