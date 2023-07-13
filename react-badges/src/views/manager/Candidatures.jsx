import React from "react";
import { Box, Typography } from "@mui/material";
import { candidatureColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_CANDIDATURE_VIEW,
  APPROVE_CANDIDATURE_PROPOSAL,
  DISAPPROVE_CANDIDATURE_PROPOSAL
} from "../../queries/CandidatureMutations";

const Candidatures = ({ managerId }) => {
  const { loading, error, data } = useQuery(GET_CANDIDATURE_VIEW, {
    variables: { managerId }
  });

  // const [approveCandidatureProposal] = useMutation(
  //   UPDATE_ISSUING_REQUEST_APPROVAL
  // );
  // const [rejectCandidatureProposal] = useMutation(
  //   UPDATE_ISSUING_REQUEST_REJECTION
  // );

  if (loading) {
    return <Box>Loading candidatures...</Box>;
  }

  if (error) {
    return <Box>Error loading candidatures: {error.message}</Box>;
  }
  return (
    <>
      <Box>
        <Typography variant="h2" fontWeight="bold">
          Candidatures
        </Typography>
        <Typography variant="h5" style={{ margin: "30px 0" }}>
          Inside the following page you will find the full list of candidatures
          that include you as the manager
        </Typography>
        <Table columns={candidatureColumns} />
      </Box>
    </>
  );
};

export default Candidatures;
