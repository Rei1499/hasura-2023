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
import {
  DISAPPROVE_CANDIDATURE_PROPOSAL,
  APPROVE_CANDIDATURE_PROPOSAL
} from "../../queries/CandidatureMutations";

const ProposalActionButtons = ({
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

  const handleRejectButtonClick = () => {
    setOpen(true);
  };

  const handleAcceptButtonClick = () => {
    // Perform the mutation for approval
    approveCandidatureProposal({
      variables: {
        proposalId: rowId,
      }
      // Handle success and error cases if needed
    });
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleAcceptButtonClick}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRejectButtonClick}
      >
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
