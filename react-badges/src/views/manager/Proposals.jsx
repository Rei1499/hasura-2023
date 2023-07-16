import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import Table from "../../components/reUsable/Table";
import { useAuth } from "../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import { proposalColumnsFromManager } from "../../components/reUsable/DataTable";

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
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const { proposalsFromManager, proposalsToManager } = data;

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

  return (
    <>
      <Box>
        <Typography variant={"h1"}>Proposals</Typography>
        <Typography>
          Inside the following page you will find all the proposal created from
          you as well as the proposals that have asked your approval.
        </Typography>
        <Table
          rows={proposalsFromManager}
          columns={proposalColumnsFromManager}
        ></Table>
        {/* <Table rows = {proposalsToManager} columns={}></Table>  */}
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
