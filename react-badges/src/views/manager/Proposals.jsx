import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import Table from "../../components/reUsable/Table";
import { useAuth } from "../../state/with-auth";
import {
  GET_PROPOSALS_WITH_STATUS
} from "../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../components/reUsable/DataTable";
import ProposalActionButtons from "./ProposalActionButtons";

const Proposals = () => {
  
  const navigate = useNavigate();

  const auth = useAuth();
  useEffect(() => {
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const { loading, error, data } = useQuery(GET_PROPOSALS_WITH_STATUS);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  const rowsFromManager =
    data?.manager_to_engineer_badge_candidature_proposals || [];
  const rowsToManager =
    data?.engineer_to_manager_badge_candidature_proposals || [];

  const updatedColumnsToManager = [
    ...proposalColumnsToManager,
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ProposalActionButtons
          rowId={params.row.id}
        />
      )
    }
  ];

  return (
    <>
      <Box>
        <Typography variant={"h1"}>Proposals</Typography>
        <Typography>
          Inside the following page you will find all the proposal created from
          you as well as the proposals that have asked your approval.
        </Typography>
        {rowsFromManager.length > 0 ? (
          <Table row={rowsFromManager} columns={proposalColumnsFromManager} />
        ) : (
          <Box>No Proposals Found.</Box>
        )}
        {rowsToManager.length > 0 ? (
          <Table row={rowsToManager} columns={updatedColumnsToManager} />
        ) : (
          <Box>No Proposals Found.</Box>
        )}
        <Button
          onClick={() => {
            navigate("/proposalform");
          }}
        >
          Create Proposal Form
        </Button>
      </Box>
    </>
  );
};

export default Proposals;
