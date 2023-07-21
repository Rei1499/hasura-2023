import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { candidatureColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import { useQuery } from "@apollo/client";
import { GET_CANDIDATURE_VIEW } from "../../queries/CandidatureMutations";
import { useAuth } from "../../state/with-auth";

const Candidatures = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { loading, error, data, refetch } = useQuery(GET_CANDIDATURE_VIEW, {
    variables: { managerId: auth.userId }
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Box>Loading candidatures...</Box>;
  }

  if (error) {
    return <Box>Error loading candidatures: {error.message}</Box>;
  }

  const rows = data?.badge_candidature_view || [];

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
        {rows.length > 0 ? (
          <Table row={rows} columns={candidatureColumns} />
        ) : (
          <Box>No candidatures found.</Box>
        )}
        <Box>
          <Button
            onClick={() => {
              navigate("/proposals");
            }}
          >
            Proposals
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Candidatures;
