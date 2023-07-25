import { useMutation } from "@apollo/client";
import { DISAPPROVE_CANDIDATURE_PROPOSAL } from "../../queries/CandidatureMutations";

export const useDisapprovalCandidatureProposal = (
  rowId,
  disapprovalMotivation,
  setOpen,
  setDisapprovalMotivation,
  refetch
) => {
  const [disapproveCandidatureProposal, {loading, error}] = useMutation(
    DISAPPROVE_CANDIDATURE_PROPOSAL,
    {
      onCompleted: () => refetch()
    }
  );

  const handleDissaprove = async () => {
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
      console.error("Error occurred while disapproving proposal:", error);
    }
  };
  return {handleDissaprove, loading, error};
};
