import ProposalStatusCell from "../proposalComponents/ProposalStatusButtons";
import ProposalActionButtons from "../../containers/Proposals/ProposalActionButtons";

export const userColumns = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "name", headerName: "Name", width: 170 },
  { field: "roles", headerName: "Roles", width: 170 }
];

export const badgeColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "description", headerName: "Description", width: 970 },
  { field: "title", headerName: "title", width: 170 }
];

export const candidatureColumns = [
  {
    field: "badge_title",
    headerName: "Badge Title",
    width: 170
  },
  {
    field: "badge_description",
    headerName: "Badge Description",
    width: 970
  },

  {
    field: "badge_requirements",
    headerName: "Badge Requirements",
    width: 970,
    renderCell: (params) => {
      const badgeRequirements = params.value;

      if (!Array.isArray(badgeRequirements) || badgeRequirements.length === 0) {
        return "No requirements";
      }

      const requirementList = badgeRequirements
        .map(
          (requirement) => `${requirement.title}: ${requirement.description}`
        )
        .join(", ");

      return requirementList;
    }
  },
  {
    field: "badge_version",
    headerName: "Badge Version",
    width: 170
  },
  {
    field: "candidature_evidences",
    headerName: "Candidature Evidences",
    width: 970
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 170
  },
  {
    field: "engineer_name",
    headerName: "Engineer",
    width: 180
  },
  {
    field: "is_issued",
    headerName: "Issued",
    width: 100
  }
];

export const proposalColumnsFromManager = [
  {
    field: "proposal_description",
    headerName: "Proposal Description",
    width: 400
  },
  {
    field: "badge_id",
    headerName: "Badge ID",
    width: 100
  },
  {
    field: "badge_version",
    headerName: "Badge Version",
    width: 200
  },
  {
    field: "engineer",
    headerName: "Engineer",
    width: 200
  },
  {
    field: "engineer_badge_candidature_proposal_responses",
    headerName: "Approval Status",
    width: 200,
    renderCell: (params) => <ProposalStatusCell value={params.value} />
  }
];
export const proposalColumnsToManager = [
  {
    field: "proposal_description",
    headerName: "Proposal Description",
    width: 400
  },
  {
    field: "badge_id",
    headerName: "Badge ID",
    width: 100
  },
  {
    field: "badge_version",
    headerName: "Badge Version",
    width: 200
  },
  {
    field: "manager",
    headerName: "Manager",
    width: 200
  },
  {
    field: "manager_badge_candidature_proposal_responses",
    headerName: "Approval Status",
    width: 200,
    renderCell: (params) => <ProposalStatusCell value={params.value} />
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <ProposalActionButtons
        rowId={params.row.id}
        approvalStatus={
          params.row.manager_badge_candidature_proposal_responses.length === 0
            ? "Pending"
            : params.row.manager_badge_candidature_proposal_responses[0]
                .is_approved === true
            ? "Approved"
            : "Rejected"
        }
        refetch={refetch}
      />
    )
  }
];
