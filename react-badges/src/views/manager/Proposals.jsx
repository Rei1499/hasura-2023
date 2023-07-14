import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Table from "../../components/reUsable/Table";
import { GET_PROPOSALS_WITH_STATUS } from "../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";

const Proposals = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Typography variant={"h1"}>Proposals</Typography>
        <Typography>
          Inside the following page you will find all the proposal created from
          you as well as the proposals that have asked your approval.
        </Typography>
        {/* <Table rows></Table> */}
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
