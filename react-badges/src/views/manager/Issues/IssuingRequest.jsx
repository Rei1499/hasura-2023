import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
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
    return <div>Loading issuing requests...</div>;
  }

  if (error) {
    return <div>Error loading issuing requests: {error.message}</div>;
  }

  return (
    <div>
      <h2>Issuing Requests</h2>
      {data.issuing_requests.map((request) => (
        <div key={request.id}>
          <p>
            Badge Title:{" "}
            {request.badge_candidature_request?.badges_definition?.title}
          </p>
          <p>
            Badge Description:{" "}
            {request.badge_candidature_request?.badges_definition?.description}
          </p>
          <p>Engineer ID: {request.badge_candidature_request?.engineer_id}</p>
          <p>
            Badge Description:{" "}
            {request.badge_candidature_request?.badges_definition?.description}
          </p>

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
