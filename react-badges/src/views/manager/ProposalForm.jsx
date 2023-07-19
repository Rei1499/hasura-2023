import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
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
import {
  GET_ENGINEERS_BY_MANAGER,
  GET_BADGES_LAST
} from "../../queries/BadgeEngineerMutations";

const ProposalForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm();

  const auth = useAuth();

  const [getEngineersByManager, { loading, error, data }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const {
    loading: loadingBadges,
    error: errorBadges,
    data: badgesData
  } = useQuery(GET_BADGES_LAST);

  console.log(badgesData);

  const [createProposalManager] = useMutation(CREATE_PROPOSAL_MANAGER);

  const fetchDataEngineers = async () => {
    try {
      if (managerId !== null && managerId !== undefined) {
        const { data } = await getEngineersByManager({
          variables: { managerId: auth.userId }
        });
        // setEngineers(result.data.get_engineers_by_manager);
        // Access the fetched data from the 'data' variable
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataEngineers();
  }, [auth.userId, getEngineersByManager]);

  const onSubmit = async (data) => {
    try {
      const selectedBadge = badgesData?.badges_versions_last?.find(
        (badge) => badge.id === data.badge
      );
      const badgeCreatedAt = selectedBadge?.created_at || null;

      await createProposalManager({
        variables: {
          badgeId: data.badge,
          badgeCreatedAt,
          proposalDescription: data.proposal_description,
          engineerId: data.engineer,
          createdBy: auth.userId
        }
      });
      navigate("/proposals");
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(data);
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
                data?.get_engineers_by_manager?.map((engineer) => (
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
        <Controller
          name="badge"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select label="Badge" {...field}>
              {loadingBadges ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : errorBadges ? (
                <MenuItem value="">Error loading badges</MenuItem>
              ) : (
                badgesData?.badges_versions_last?.map((badge) => (
                  <MenuItem key={badge.id} value={badge.id}>
                    {badge.title}
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        />
        {errors.badge && <FormHelperText>Badge is required</FormHelperText>}
      </Box>
      {/* <Box>
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
      </Box> */}
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
