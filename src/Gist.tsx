import * as React from "react";
import { Avatar, Box, Chip, Link, Paper, Typography } from "@mui/material";
import { makeGetRequest } from "./request";

function Gist({ gist }) {
  const { files, description, forks_url } = gist;
  const [forks, setForks] = React.useState([]);
  const name = Object.keys(files)[0] || "Untitled";

  React.useEffect(() => {
    makeGetRequest(forks_url)
      .then((response) => {
        const lastThreeForks = response.data.slice(0, 3);
        setForks(lastThreeForks);
      })
      .catch((error) => console.log(error));
  }, [forks_url]);

  const getTagsFromFiles = (files) => {
    const fileTypes = Object.keys(files).map((key) =>
      files[key].language ? files[key].language.toLowerCase() : "unknown"
    );

    const uniqueFileTypes = [...new Set(fileTypes)];

    return uniqueFileTypes.map((fileType) => (
      <Chip key={fileType} label={fileType} size="small" sx={{ mr: 1 }} />
    ));
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: 140,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box mt={1}>{getTagsFromFiles(gist.files)}</Box>
        </Box>
        {forks.length ? (
          <Box sx={{ ml: "auto", display: "flex", flexDirection: "column" }}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                textAlign={"right"}
              >
                Forked by:
              </Typography>
            </Box>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              {forks.map((fork: any) => (
                <Box key={fork.id} sx={{ ml: 1 }}>
                  <Link href={fork.html_url} target="_blank">
                    <Avatar
                      src={fork.owner.avatar_url}
                      alt={fork.owner.login}
                    />
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}

export default Gist;
