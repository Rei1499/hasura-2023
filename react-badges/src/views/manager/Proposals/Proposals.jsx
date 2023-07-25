import React, { useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../../components/reUsable/DataTable";
import ProposalActionButtons from "../../../containers/Proposals/ProposalActionButtons";
import { makeStyles } from "@mui/styles";
import ExpandableDataGrid from "../../../components/proposalComponents/ExpandableDataGrid";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  paragraph: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

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
    <Container className={classes.container}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.title}>
            Proposals
          </Typography>
          <Typography paragraph className={classes.paragraph}>
            Inside this page, you will find all the proposals created by you as
            well as the proposals that require your approval.
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          {rowsFromManager.length > 0 ? (
            <ExpandableDataGrid
              title="Proposals Created By You"
              data={rowsFromManager}
              columns={proposalColumnsFromManager}
            />
          ) : (
            <Box>No Proposals Found.</Box>
          )}
          {rowsToManager.length > 0 ? (
            <ExpandableDataGrid
              title="Proposals Requiring Your Approval"
              data={rowsToManager}
              columns={updatedColumnsToManager}
            />
          ) : (
            <Box>No Proposals Found.</Box>
          )}
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Proposals;
