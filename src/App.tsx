import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const TopBar = styled("div")(({ theme }) => ({
  backgroundColor: "#1976d2",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AvatarImage = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  marginRight: "10px",
});

const GistBox = ({ gist }) => {
  const [forks, setForks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getForks = async () => {
    setLoading(true);
    const response = await fetch(gist.forks_url);
    const data = await response.json();
    const forks = data.slice(0, 3).map((fork) => ({
      user: fork.owner.login,
      avatarUrl: fork.owner.avatar_url,
      htmlUrl: fork.html_url,
    }));
    setForks(forks);
    setLoading(false);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center">
          <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
            <AvatarImage src={gist.owner.avatar_url} alt={gist.owner.login} />
          </a>
          <Typography>{gist.owner.login}</Typography>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box>
          <Typography>{gist.description}</Typography>
          <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
            {gist.html_url}
          </a>
          <Box display="flex" sx={{ flexWrap: "wrap" }}>
            {Object.values(gist.files).map((file: any) => (
              <Typography
                key={file.filename}
                sx={{
                  backgroundColor: "lightgray",
                  padding: "2px",
                  borderRadius: "2px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
              >
                {file.language}
              </Typography>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          forks.map((fork: any) => (
            <Box key={fork.htmlUrl} display="flex" alignItems="center">
              <a href={fork.htmlUrl} target="_blank" rel="noopener noreferrer">
                <AvatarImage src={fork.avatarUrl} alt={fork.user} />
              </a>
              <Typography>{fork.user}</Typography>
            </Box>
          ))
        )}
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" justifyContent="flex-end">
          <Typography>{gist.updated_at.slice(0, 10)}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const PER_PAGE = 10;

const App = () => {
  const [username, setUsername] = useState("");
  const [currentGists, setCurrentGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/gists?page=${page}&per_page=${PER_PAGE}`
      );
      const data = await response.json();
      setCurrentGists(data);
    } catch (error) {
      console.error(error);
      setCurrentGists([]);
    }
    setLoading(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const response = await fetch("https://api.github.com/gists/public");
        const data = await response.json();
        setCurrentGists(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGists();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ bgcolor: "primary.main", p: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GitGist
        </Typography>
      </Box>
      <Container sx={{ pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2 }}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Pagination
                count={Math.ceil(currentGists.length / PER_PAGE)}
                color="primary"
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          {loading ? (
            <CircularProgress />
          ) : currentGists.length === 0 ? (
            <Typography>No gists found</Typography>
          ) : (
            <Grid container spacing={2}>
              {currentGists.map((gist: any) => (
                <GistBox gist={gist} />
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
