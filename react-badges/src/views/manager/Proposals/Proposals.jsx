import React, { useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { useQuery } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../../components/reUsable/DataTable";
import { makeStyles } from "@mui/styles";

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
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  gridContainer: {
    marginTop: theme.spacing(2)
  },
  customDataGrid: {
    "& .MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none" // Remove focus outline
    }
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
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h1" className={classes.title}>
              Proposals Created From You
            </Typography>
            <DataGrid
              rows={rowsFromManager}
              columns={proposalColumnsFromManager}
              hideFooter
              disableSelectionOnClick
              className={classes.customDataGrid}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h1" className={classes.title}>
              Proposals Coming To You
            </Typography>
            <DataGrid
              rows={rowsToManager}
              columns={proposalColumnsToManager}
              hideFooter // Hide the footer with pagination controls
              disableSelectionOnClick // Disable selection outline on row click
              className={classes.customDataGrid} // Apply custom style
            />
          </Paper>
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
