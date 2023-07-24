import { useMutation } from "@apollo/client";
import { DISAPPROVE_CANDIDATURE_PROPOSAL } from "../../queries/CandidatureMutations";

export const handleSubmit = async (
  disapproveCandidatureProposal,
  rowId,
  disapprovalMotivation,
  setOpen,
  setDisapprovalMotivation,
  refetch
) => {
  const [
    disapproveCandidatureProposal,
    { loading: loadingDisapprove, error: errorDisapprove }
  ] = useMutation(DISAPPROVE_CANDIDATURE_PROPOSAL, {
    onCompleted: () => refetch()
  });

  try {
    await disapproveCandidatureProposal({
      variables: {
        proposalId: rowId,
        disapprovalMotivation: disapprovalMotivation
      }
    });

    setOpen(false);
    setDisapprovalMotivation("");
    refetch();
  } catch (error) {
    console.log(error);
  }
};
