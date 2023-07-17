import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DISAPPROVE_CANDIDATURE_PROPOSAL } from "../../queries/CandidatureMutations";

const ProposalActionButtons = ({
  handleAcceptClick,
  handleRejectClick,
  rowId
}) => {
  const [open, setOpen] = useState(false);
  const [disapprovalMotivation, setDisapprovalMotivation] = useState("");
  const [disapproveCandidatureProposal] = useMutation(
    DISAPPROVE_CANDIDATURE_PROPOSAL
  );
  const [approveCandidatureProposal] = useMutation(
    APPROVE_CANDIDATURE_PROPOSAL
  );

  const handleRejectClick = () => {
    setOpen(true);
  };

  const handleAcceptClick = () => {
    // Perform the mutation for approval
    approveCandidatureProposal({
      variables: {
        id: rowId,
        disapprovalMotivation: ""
      }
      // Handle success and error cases if needed
    });
  };

  const handleRejectClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisapprovalMotivation("");
  };

  const handleSubmit = () => {
    // Perform the mutation with the disapprovalMotivation
    disapproveCandidatureProposal({
      variables: {
        id: rowId,
        disapprovalMotivation: disapprovalMotivation
      }
      // Handle success and error cases if needed
    });

    setOpen(false);
    setDisapprovalMotivation("");
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAcceptClick}>
        Accept
      </Button>
      <Button variant="contained" color="secondary" onClick={handleRejectClick}>
        Reject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rejection</DialogTitle>
        <DialogContent>
          <TextField
            label="Disapproval Motivation"
            value={disapprovalMotivation}
            onChange={(e) => setDisapprovalMotivation(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Rejection</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProposalActionButtons;
