import React from "react";
import { Button } from "@mui/material";

const ProposalStatusCell = ({ value, onClick }) => {
  console.log(value);
  if (value.length === 0) {
    return (
      <Button
        variant="contained"
        color="secondary"
        value="Pending"
        onClick={onClick}
      >
        Pending
      </Button>
    );
  } else {
    const isApproved = value[0]?.is_approved;
    if (isApproved === true) {
      return (
        <Button
          variant="contained"
          color="primary"
          value="Pending"
          onClick={onClick}
        >
          Approved
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="error"
          value="Pending"
          onClick={onClick}
        >
          Rejected
        </Button>
      );
    }
  }
};

export default ProposalStatusCell;
