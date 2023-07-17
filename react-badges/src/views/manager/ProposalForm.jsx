import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../state/with-auth";
import { Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CREATE_PROPOSAL_MANAGER } from "../../queries/CandidatureMutations";
import { GET_ENGINEERS_BY_MANAGER } from "../../queries/BadgeEngineerMutations";

const ProposalForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm();

  const [managerId, setManagerId] = useState();
  const [engineers, setEngineers] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const [getEngineersByManager, { loading, error, data }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const fetchData = async () => {
    try {
      if (managerId !== null && managerId !== undefined) {
        const result = await getEngineersByManager({
          variables: { managerId }
        });
        setEngineers(result.data.get_engineers_by_manager);
        // Access the fetched data from the 'data' variable
        console.log(data);
      }
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
      await createProposalManager({
        variables: {
          badgeId: data.badge_id,
          badgeVersion: data.badge_version,
          proposalDescription: data.proposal_description,
          engineer: data.engineer
        }
      });
      navigate("/proposals");
      console.log(data);
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography>Create a new proposal</Typography>
        <Controller
          name="engineer"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select label="Engineer" {...field}>
              {loading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : error ? (
                <MenuItem value="">Error loading engineers</MenuItem>
              ) : (
                engineers?.map((engineer) => (
                  <MenuItem key={engineer.id} value={engineer.id}>
                    {engineer.name}
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        />
        {errors.engineer && (
          <FormHelperText>Engineer is required</FormHelperText>
        )}
      </Box>
      <Box>
        <TextField
          label="Badge ID"
          type="number"
          {...register("badge_id", { required: true })}
        />
        {errors.badge_id && (
          <FormHelperText>Badge ID is required</FormHelperText>
        )}
      </Box>
      <Box>
        <TextField
          label="Badge Version"
          type="text"
          {...register("badge_version", { required: true })}
        />
        {errors.badge_version && (
          <FormHelperText>Badge Version is required</FormHelperText>
        )}
      </Box>
      <Box>
        <TextField
          label="Proposal Description"
          multiline
          minRows={4}
          {...register("proposal_description", { required: true })}
        />
        {errors.proposal_description && (
          <FormHelperText>Proposal Description is required</FormHelperText>
        )}
      </Box>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
      {error && <FormHelperText>Error: {error.message}</FormHelperText>}
    </form>
  );
};

export default ProposalForm;
