import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Box, TextField, Button } from "@mui/material";
import { CREATE_PROPOSAL_MANAGER } from "../../queries/ProposalMutations";

const ProposalForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const [createProposalManager, { loading, error }] = useMutation(
    CREATE_PROPOSAL_MANAGER
  );

  const onSubmit = async (data) => {
    try {
      await createProposalManager({ variables: data });
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.proposal_description && <span>Proposal Description is required</span>}
      </Box>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
      {error && <span>Error: {error.message}</span>}
    </form>
  );
};

export default ProposalForm;
