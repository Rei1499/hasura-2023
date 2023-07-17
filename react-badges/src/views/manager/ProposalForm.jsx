import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../state/with-auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CREATE_PROPOSAL_MANAGER } from "../../queries/CandidatureMutations";
import { GET_ENGINEERS_BY_MANAGER } from "../../queries/BadgeEngineerMutations";

const ProposalForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const [managerId, setManagerId] = useState();

  const auth = useAuth();
  useEffect(() => {
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const [getEngineersByManager, { loading, error, data }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const fetchData = async () => {
    try {
      const { data } = await getEngineersByManager({
        variables: { managerId }
      });
      // Access the fetched data from the 'data' variable
      console.log(data);
      // Handle the data as needed
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [
    createProposalManager,
    { loading: submitLoading, error: submitError }
  ] = useMutation(CREATE_PROPOSAL_MANAGER);

  const onSubmit = async (data) => {
    try {
      await createProposalManager({ variables: data });
      navigate("/proposals");
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography>Create a new proposal</Typography>
        <Select label="Engineer" {...register("engineer", { required: true })}>
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
          ) : error ? (
            <MenuItem value="">Error loading engineers</MenuItem>
          ) : (
            data?.get_engineers_by_manager?.map((engineer) => (
              <MenuItem key={engineer.id} value={engineer.id}>
                {engineer.name}
              </MenuItem>
            ))
          )}
        </Select>
        {errors.engineer && <span>Engineer is required</span>}
      </Box>
      <Box>
        <TextField
          label="Badge ID"
          type="number"
          {...register("badge_id", { required: true })}
        />
        {errors.badge_id && <span>Badge ID is required</span>}
      </Box>
      <Box>
        <TextField
          label="Badge Version"
          type="text"
          {...register("badge_version", { required: true })}
        />
        {errors.badge_version && <span>Badge Version is required</span>}
      </Box>
      <Box>
        <TextField
          label="Proposal Description"
          multiline
          minRows={4}
          {...register("proposal_description", { required: true })}
        />
        {errors.proposal_description && (
          <span>Proposal Description is required</span>
        )}
      </Box>
      <Button type="submit" disabled={loading} onClick={navigate("/proposals")}>
        Submit
      </Button>
      {error && <span>Error: {error.message}</span>}
    </form>
  );
};

export default ProposalForm;
