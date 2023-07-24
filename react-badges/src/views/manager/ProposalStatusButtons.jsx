import React from "react";
import { Button } from "@mui/material";

const ProposalStatusCell = ({ value }) => {
  if (value.length === 0) {
    return (
      <Button variant="contained" color="secondary">
        Pending
      </Button>
    );
  } else {
    const isApproved = value[0]?.is_approved;
    if (isApproved === true) {
      return (
        <Button variant="contained" color="primary">
          Approved
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="error">
          Rejected
        </Button>
      );
    }
  }
};

export default ProposalStatusCell;
