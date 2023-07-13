import React from "react";
import { Box, Typography } from "@mui/material";
import { candidatureColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import { 
  GET_CANDIDATURE_VIEW ,
  CANDIDATURE_APPROVED,
  CREATE_PROPOSAL_MANAGER,
} from "../../queries/CandidatureMutations"


const IssuingRequests = ({ managerId }) => {
  const { loading, error, data } = useQuery(GET_ISSUING_REQUESTS_FOR_MANAGER, {
    variables: { managerId }
  });

  const [approveIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_APPROVAL);
  const [rejectIssuingRequest] = useMutation(UPDATE_ISSUING_REQUEST_REJECTION);


  if (loading) {
    return <Box>Loading issuing requests...</Box>;
  }

  if (error) {
    return <Box>Error loading issuing requests: {error.message}</Box>;
  }


const Candidatures = () => {
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
        <Table columns={candidatureColumns} />
      </Box>
    </>
  );
};

export default Candidatures;
