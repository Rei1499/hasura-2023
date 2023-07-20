import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../../state/with-auth";
import {
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

const IssuingRequests = () => {
  const auth = useAuth();

  const managerId = Number(auth.hasura["x-hasura-tenant-id"]);
  console.log(managerId, "ManagerId");
  const { loading, error, data, refetch } = useQuery(
    GET_ISSUING_REQUESTS_FOR_MANAGER,
    {
      variables: { managerId: { _eq: managerId } }
    }
  );
  const [requestedId, setRequestedId] = useState();
  const [open, setOpen] = useState(false);
  const [disapprovalMotivation, setDisapprovalMotivation] = useState("");
  const [approveIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_APPROVAL, {
    onCompleted: () => refetch()
  });
  const [rejectIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_REJECTION, {
    onCompleted: () => refetch()
  });

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
    setRequestedId(requestId);
  };
  const handleSubmit = () => {
    rejectIssuingRequest({
      variables: {
        id: requestedId,
        disapprovalMotivation: disapprovalMotivation
      }
    });

    setOpen(false);
    setDisapprovalMotivation("");
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

  return (
    <>
      <Typography
        variant="h2"
        color="text.primary"
        gutterBottom
        marginLeft={6}
        fontWeight="bold"
      >
        Issuing Requests
      </Typography>
      {data.issuing_requests_view.map((request) => (
        <Card key={request.id} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Badge Title: {request.badge_title}
            </Typography>
            <Typography variant="body2">
              Badge Description: {request.badge_description}
            </Typography>
            <Typography variant="body1">
              Engineer Name: {request.engineer_name}
            </Typography>

            <Typography variant="body1">
              Badge Version: {request.badge_version}
            </Typography>

            {Object.values(request.candidature_evidences).map(
              (evidence, index) => (
                <Typography key={index} variant="body1">
                  Candidature evidence number {index + 1}: {evidence}
                </Typography>
              )
            )}
          </CardContent>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleApproveIssuingRequest(request.id)}
          >
            Approve
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleRejectIssuingRequest(request.id)}
          >
            Reject
          </Button>
        </Card>
      ))}
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
    </>
  );
};

export default IssuingRequests;
