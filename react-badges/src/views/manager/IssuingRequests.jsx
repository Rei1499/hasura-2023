import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../state/with-auth";

import IssuingRequestCard from "../../components/reUsable/IssuingRequestCard";
import RejectionDialog from "../../components/issueComponents/RejectionDialog";
import LoadingError from "../../components/issueComponents/LoadingError";
import {
  GET_ISSUING_REQUESTS_FOR_MANAGER,
  UPDATE_ISSUING_REQUEST_APPROVAL,
  UPDATE_ISSUING_REQUEST_REJECTION
} from "../../queries/IssueMutations";

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
  const handleRejectIssuingRequest = (requestId, motivation) => {
    setRequestedId(requestId);
    setDisapprovalMotivation(motivation);
    setOpen(true);
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

  return (
    <Box sx={{ overflowY: "auto" }}>
      <Typography
        variant="h2"
        color="text.primary"
        gutterBottom
        marginLeft={6}
        fontWeight="bold"
      >
        Issuing Requests
      </Typography>
      <LoadingError loading={loading} error={error} />
      {!loading && !error && (
        <>
          {data.issuing_requests_view.map((request) => (
            <IssuingRequestCard
              key={request.id}
              request={request}
              onApprove={handleApproveIssuingRequest}
              onReject={handleRejectIssuingRequest}
              onExpand={handleExpand}
              expanded={expandedData[request.id]}
            />
          ))}
          <RejectionDialog
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Box>
  );
};

export default IssuingRequests;
