import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import Table from "../../components/reUsable/Table";
import { GET_PROPOSALS_WITH_STATUS } from "../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";

const Proposals = () => {
  
  const [proposalsFromManager, setProposalsFromManager ] = useState([])
  const [proposalsToManager, setProposalsToManager] = useState([]);
  const [managerId, setManagerId] = useState();
  const navigate = useNavigate();

  const auth = useAuth()
  useEffect(()=>{
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const [getProposalsWithStatus, {loading, error, data}] = useMutation(GET_PROPOSALS_WITH_STATUS)

  const fetchProposalsFromDB = async () => {
    try{
      if (managerId !== null && managerId !== undefined ){
      const result = await getProposalsWithStatus({
        variables: { managerId }
      });
      setProposalsFromManager(result.data.)
    }

    } catch (error) {
      console.error("Error fetching proposals: ", error);
    }
  }

  useEffect(()=>{

  })

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
