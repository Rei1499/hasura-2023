import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Card,
  CardContent,
  Typography,
  DialogTitle,
  TextField
} from "@mui/material";
import {
  GET_ISSUING_REQUESTS_FOR_MANAGER,
  UPDATE_ISSUING_REQUEST_APPROVAL,
  UPDATE_ISSUING_REQUEST_REJECTION
} from "../../../queries/IssueMutations";

const IssuingRequests = ({ managerId }) => {
  console.log(managerId, "ManagerId");
  const { loading, error, data } = useQuery(GET_ISSUING_REQUESTS_FOR_MANAGER, {
    variables: { managerId: { _eq: managerId } }
  });
  const [open, setOpen] = useState(false);
  const [disapprovalMotivation, setDisapprovalMotivation] = useState("");
  const [approveIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_APPROVAL);
  const [rejectIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_REJECTION);

  const handleApproveIssuingRequest = (requestId) => {
    approveIssuingRequest({
      variables: { id: requestId }
    });
  };
  const handleClose = () => {
    setOpen(false);
    setDisapprovalMotivation("");
  };
  const handleRejectIssuingRequest = (requestId) => {
    setOpen(true);
  };

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
  console.log(data);
  const handleSubmit = () => {
    rejectIssuingRequest({
      variables: { id: requestId }
    });

    setOpen(false);
    setDisapprovalMotivation("");
  };
  return (
    <div>
      <Typography
        variant="h2"
        sx={{ fontSize: 24 }}
        color="text.primary"
        gutterBottom
      >
        Issuing Request
      </Typography>
      <Card variant="outlined">
        <CardContent>
          {data.issuing_requests_view.map((request) => (
            <div key={request.id}>
              <Typography variant="h5" component="div">
                Badge Title: {request.badge_title}
              </Typography>
              <Typography variant="body2">
                Badge Description: {request.badge_description}
              </Typography>
              <Typography variant="body1">
                Engineer Name: {request.engineer_name}
              </Typography>
              <Button
                size="small"
                onClick={() => handleApproveIssuingRequest(request.id)}
              >
                Approve
              </Button>
              <Button
                size="small"
                onClick={() => handleRejectIssuingRequest(request.id)}
              >
                Reject
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default IssuingRequests;
