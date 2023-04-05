import * as React from "react";
import { Box, Button, Grid, LinearProgress, TextField } from "@mui/material";
import Gist from "./Gist";
import { makeGetRequest } from "./request";
import { Pagination } from "./Pagination";

function GistList() {
  const [gists, setGists] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchGists = (pageNumber, searchValue?) => {
    setLoading(true);
    const endpoint = !!searchValue
      ? `https://api.github.com/users/${searchValue}/gists`
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
    fetchGists(currentPage, searchText);
  }, [currentPage]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value.trim());
  };

  const handleSearchButtonClick = () => {
    setCurrentPage(1);
    fetchGists(currentPage, searchText);
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
    <>
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
              placeholder="eg. HarmJ0y"
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
    </>
  );
}

export default GistList;
