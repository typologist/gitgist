import * as React from "react";
import { Avatar, Box, Link, Typography } from "@mui/material";
import { makeGetRequest } from "./request";

function Gist({ gist }) {
  const { owner, description, forks_url } = gist;

  const [forks, setForks] = React.useState([]);

  React.useEffect(() => {
    makeGetRequest(forks_url)
      .then((response) => {
        const forks = response.data.slice(0, 3);
        setForks(forks);
      })
      .catch((error) => console.log(error));
  }, [forks_url]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {/* <Avatar sx={{ mr: 1 }} src={owner.avatar_url} alt={owner.login} /> */}
      {/* <Box>
        <Typography variant="subtitle2" gutterBottom>
          {owner.login}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box> */}
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
        {forks.map((fork: any) => (
          <Box key={fork.id} sx={{ ml: 1 }}>
            <Link href={fork.owner.html_url} target="_blank">
              <Avatar src={fork.owner.avatar_url} alt={fork.owner.login} />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Gist;
