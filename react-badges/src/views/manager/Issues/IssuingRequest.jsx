import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import {
  GET_ISSUING_REQUESTS_FOR_MANAGER,
  UPDATE_ISSUING_REQUEST_APPROVAL,
  UPDATE_ISSUING_REQUEST_REJECTION
} from "../../../queries/IssueMutations";

const IssuingRequests = ({ managerId }) => {
  const { loading, error, data } = useQuery(GET_ISSUING_REQUESTS_FOR_MANAGER, {
    variables: { managerId }
  });

  const [approveIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_APPROVAL);
  const [rejectIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_REJECTION);

  const handleApproveIssuingRequest = (requestId) => {
    approveIssuingRequest({
      variables: { id: requestId },
      update: (cache) => {
        // Update cache logic here
      }
    });
  };

  const handleRejectIssuingRequest = (requestId) => {
    rejectIssuingRequest({
      variables: { id: requestId },
      update: (cache) => {
        // Update cache logic here
      }
    });
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
    <div>
      <Typography variant="h2">Issuing Requests</Typography>
      {data.issuing_requests.map((request) => (
        <div key={request.id}>
          <Typography variant="body1">
            Badge Title:{" "}
            {request.badge_candidature_request?.badges_definition?.title}
          </Typography>
          <Typography variant="body1">
            Badge Description:{" "}
            {request.badge_candidature_request?.badges_definition?.description}
          </Typography>
          <Typography variant="body1">
            Engineer ID: {request.badge_candidature_request?.engineer_id}
          </Typography>
          <Button onClick={() => handleApproveIssuingRequest(request.id)}>
            Approve
          </Button>
          <Button onClick={() => handleRejectIssuingRequest(request.id)}>
            Reject
          </Button>
        </div>
      ))}
    </div>
  );
};

export default IssuingRequests;
