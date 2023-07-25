import React from "react";
import { Typography } from "@mui/material";

const LoadingError = ({ loading, error }) => {
  if (loading) {
    return <Typography>Loading issuing requests...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error loading issuing requests: {error.message}
      </Typography>
    );
  }

  return null;
};

export default LoadingError;
