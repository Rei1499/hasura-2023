import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const LoadingWithCircularProgress = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box textAlign="center">
      <CircularProgress color="primary" />
      <Typography sx={{ fontSize: "18px", color: "#666", padding: "20px" }}>
        Loading...
      </Typography>
    </Box>
  </Box>
);

export const ErrorMessage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box textAlign="center">
      <p style={{ fontSize: "18px", color: "red", padding: "20px" }}>
        Error: Failed to load data
      </p>
    </Box>
  </Box>
);

export const NoDataMessage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box textAlign="center">
      <p style={{ fontSize: "18px", color: "#666", padding: "20px" }}>
        No data available
      </p>
    </Box>
  </Box>
);
