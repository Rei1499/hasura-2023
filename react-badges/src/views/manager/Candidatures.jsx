import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { candidatureColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATURE_VIEW } from "../../queries/CandidatureMutations";
import { useAuth } from "../../state/with-auth";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  LoadingWithCircularProgress,
  ErrorMessage,
  NoDataMessage
} from "../../layouts/MessagesLayout/Messages";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "center"
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  title: {
    fontWeight: "bold"
  },
  subtitle: {
    margin: "30px 0"
  },
  tableContainer: {
    height: 300, // Adjust the height as needed
    width: "100%"
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const Candidatures = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useAuth();

  const { loading, error, data, refetch } = useQuery(GET_CANDIDATURE_VIEW, {
    variables: { managerId: auth.userId }
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <LoadingWithCircularProgress />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const rows = data?.badge_candidature_view || [];

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h2" className={classes.title}>
            Candidatures
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Inside the following page you will find the full list of
            candidatures that include you as the manager
          </Typography>
        </Box>
        {rows.length > 0 ? (
          <Box className={classes.tableContainer}>
            <DataGrid rows={rows} columns={candidatureColumns} />
          </Box>
        ) : (
          <Box className={classes.noDataText}>No candidatures found.</Box>
        )}
        <Box>
          <Button
            onClick={() => {
              navigate("/proposals");
            }}
            className={classes.button}
          >
            Proposals
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Candidatures;
