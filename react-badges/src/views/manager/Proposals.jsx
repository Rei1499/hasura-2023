import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import Table from "../../components/reUsable/Table";
import { useAuth } from "../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../components/reUsable/DataTable";

const Proposals = () => {
  // const [proposalsFromManager, setProposalsFromManager] = useState([]);
  // const [proposalsToManager, setProposalsToManager] = useState([]);
  const [managerId, setManagerId] = useState();
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

  // const fetchProposalsFromDB = async () => {
  //   try {
  //     if (managerId !== null && managerId !== undefined) {
  //       const result = await getProposalsWithStatus({
  //         variables: { managerId }
  //       });
  //       setProposalsFromManager(
  //         result.data.manager_to_engineer_badge_candidature_proposals
  //       );
  //       setProposalsToManager(
  //         result.data.engineer_to_manager_badge_candidature_proposals
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching proposals: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProposalsFromDB;
  // }, [managerId]);

  console.log(rowsFromManager);

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
          <Table row={rowsToManager} columns={proposalColumnsToManager} />
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
