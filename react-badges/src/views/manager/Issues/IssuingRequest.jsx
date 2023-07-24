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
  Box,
  TextField
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import {
  GET_ISSUING_REQUESTS_FOR_MANAGER,
  UPDATE_ISSUING_REQUEST_APPROVAL,
  UPDATE_ISSUING_REQUEST_REJECTION
} from "../../../queries/IssueMutations";

const useStyles = makeStyles({
  card: {
    width: "400px",
    margin: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold"
  },
  description: {
    marginTop: "8px",
    fontSize: "0.9rem"
  },
  evidence: {
    marginTop: "8px",
    fontSize: "0.9rem",
    color: "#666"
  },
  buttonsContainer: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between"
  }
});

const IssuingRequests = () => {
  const auth = useAuth();

  const classes = useStyles();

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
  const [expandedData, setExpandedData] = useState({});

  const handleExpand = (requestId) => {
    setExpandedData((prevExpandedData) => {
      return {
        ...prevExpandedData,
        [requestId]: !prevExpandedData[requestId]
      };
    });
  };

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
    <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
      <Typography
        variant="h2"
        color="text.primary"
        gutterBottom
        marginLeft={6}
        fontWeight="bold"
      >
        Issuing Requests
      </Typography>
      {loading ? (
        <Typography>Loading issuing requests...</Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading issuing requests: {error.message}
        </Typography>
      ) : (
        data.issuing_requests_view.map((request) => (
          <Card key={request.id} variant="outlined" className={classes.card}>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className={classes.title}
              >
                Badge Title: {request.badge_title}
              </Typography>
              <Typography variant="body1">
                Engineer Name: {request.engineer_name}
              </Typography>
              <Typography variant="body1">
                Badge Version: {request.badge_version}
              </Typography>
              <Typography variant="body2" className={classes.description}>
                Badge Description:{" "}
                {expandedData[request.id]
                  ? request.badge_description
                  : `${request.badge_description.slice(0, 20)}...`}
              </Typography>
              {Object.values(request.candidature_evidences).map(
                (evidence, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    className={classes.evidence}
                    paragraph
                  >
                    Candidature evidence number {index + 1}:{" "}
                    {expandedData[request.id] || evidence.length <= 10
                      ? evidence
                      : `${evidence.slice(0, 10)}...`}
                  </Typography>
                )
              )}
              {(request.badge_description.length > 100 ||
                Object.keys(request.candidature_evidences).length > 0) && (
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleExpand(request.id)}
                >
                  {expandedData[request.id] ? "Read Less" : "Read More"}
                </Button>
              )}
            </CardContent>
            <div className={classes.buttonsContainer}>
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
            </div>
          </Card>
        ))
      )}
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

export default IssuingRequests;
