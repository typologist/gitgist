import { Button, Typography } from "@mui/material";
import * as React from "react";

export function Pagination({ onNextPage, onPreviousPage, currentPage }) {
  return (
    <>
      <Button
        variant="contained"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography sx={{ mx: 2 }}>{currentPage}</Typography>
      <Button variant="contained" onClick={onNextPage}>
        Next
      </Button>
    </>
  );
}
