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
  FormHelperText,
  Card,
  CardContent,
  CardHeader,
  InputLabel
} from "@mui/material";
import useStyles from "../../components/proposalComponents/style.js";
import { useNavigate, useLocation } from "react-router-dom";
import { CREATE_PROPOSAL_MANAGER } from "../../queries/CandidatureMutations.js";
import {
  GET_ENGINEERS_BY_MANAGER,
  GET_BADGES_LAST
} from "../../queries/BadgeEngineerMutations.js";

const ProposalForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "location");
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      engineer: location.state?.engineerId || null,
      badge: location.state?.badgeId || null
    }
  });

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
      const { data } = await getEngineersByManager({
        variables: { managerId: auth.userId }
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataEngineers();
  }, [getEngineersByManager]);

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

  if (loading || loadingBadges) return <Box>Loading...</Box>;
  if (error || errorBadges)
    return <Box>Error: {error?.message || errorBadges?.message}</Box>;

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={<Typography variant="h2">Create a new proposal</Typography>}
        />
        <CardContent className={classes.cardContent}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.inputField}>
              <InputLabel>Select Engineer</InputLabel>
              <Controller
                name="engineer"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    label="Select Engineer"
                    sx={{ width: "300px" }}
                    {...field}
                  >
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
            <Box className={classes.inputField}>
              <InputLabel>Select Badge</InputLabel>
              <Controller
                name="badge"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    label="Select Badge"
                    sx={{ width: "300px" }}
                    {...field}
                  >
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
              {errors.badge && (
                <FormHelperText>Badge is required</FormHelperText>
              )}
            </Box>
            <Box className={classes.inputField}>
              <InputLabel>Proposal Description</InputLabel>
              <TextField
                multiline
                rows={4}
                sx={{ width: "300px" }}
                {...register("proposal_description", { required: true })}
              />
              {errors.proposal_description && (
                <FormHelperText>
                  Proposal Description is required
                </FormHelperText>
              )}
            </Box>
            <Button type="submit" className={classes.button} disabled={loading}>
              Submit
            </Button>
            {error && <FormHelperText>Error: {error.message}</FormHelperText>}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProposalForm;
