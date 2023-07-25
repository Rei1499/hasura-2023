import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../../components/reUsable/DataTable";
import useStyles from "../../../components/proposalComponents/style.js";
import ProposalActionButtons from "../../../containers/Proposals/ProposalActionButtons";
import {
  LoadingWithCircularProgress,
  ErrorMessage,
  NoDataMessage
} from "../../layouts/MessagesLayout/Messages";

const Proposals = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const auth = useAuth();

  const { loading, error, data, refetch } = useQuery(
    GET_PROPOSALS_WITH_STATUS,
    {
      variables: { managerId: auth.userId }
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <LoadingWithCircularProgress />;
  }

  if (error) {
    return <ErrorMessage />;
  }
  if (!data) {
    return <NoDataMessage />;
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
          approvalStatus={
            params.row.manager_badge_candidature_proposal_responses.length === 0
              ? "Pending"
              : params.row.manager_badge_candidature_proposal_responses[0]
                  .is_approved === true
              ? "Approved"
              : "Rejected"
          }
          refetch={refetch}
        />
      )
    }
  ];

  return (
    <>
      <Container className={classes.container}>
        <Box>
          <Typography variant={"h1"} className={classes.title}>
            Proposals
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Inside the following page you will find all the proposal created
            from you as well as the proposals that have asked your approval.
          </Typography>
          {rowsFromManager.length > 0 ? (
            <>
              <Typography variant="h3" className={classes.sectionTitle}>
                Proposals From You
              </Typography>
              <DataGrid
                rows={rowsFromManager}
                columns={proposalColumnsFromManager}
              />
            </>
          ) : (
            <Box>No Proposals Found.</Box>
          )}
          {rowsToManager.length > 0 ? (
            <>
              <Typography variant="h3" className={classes.sectionTitle}>
                Proposals Requiring Your Approval
              </Typography>
              <DataGrid
                rows={rowsToManager}
                columns={updatedColumnsToManager}
              />
            </>
          ) : (
            <Box>No Proposals Found.</Box>
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              navigate("/proposalform");
            }}
          >
            Create Proposal Form
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Proposals;
