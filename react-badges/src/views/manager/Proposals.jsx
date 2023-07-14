import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "../../components/reUsable/Table";
import { GET_PROPOSALS_WITH_STATUS } from "../../queries/CandidatureMutations";

const Proposals = () => {
  return (
    <>
      <Box>
        <Typography variant={"h1"}>Proposals</Typography>
        <Typography>Inside the following page you will find all the proposal created from you as well as the proposals that have asked your approval.</Typography>
        <Table rows></Table>

      </Box>
    </>
  );
};

export default Proposals;
