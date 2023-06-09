import { Button, Typography } from "@mui/material";
import * as React from "react";

export function Pagination({ onNextPage, onPreviousPage, currentPage }) {
  return (
    <>
      <Button
        variant="outlined"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography sx={{ mx: 2, my: 2 }}>{currentPage}</Typography>
      <Button variant="outlined" onClick={onNextPage}>
        Next
      </Button>
    </>
  );
}
