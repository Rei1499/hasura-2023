import { gql } from "@apollo/client";

export const GET_ISSUING_REQUESTS_FOR_MANAGER = gql`
  query getIssueRequest {
    issuing_requests {
      disapproval_motivation
      id
      is_approved
      badge_candidature_request {
        badge_version
        manager_id
        is_issued
        badge_id
        engineer_id
        candidature_evidences
        badges_definition {
          title
          description
        }
      }
    }
  }
`;

export const GET_PROPOSALS_WITH_STATUS = gql`
query getProposalsWithStatus {
  manager_to_engineer_badge_candidature_proposals(where: {user: {id: {_eq: 2}}}) {
    id
    proposal_description
    badge_id
    badge_version
    engineer
    engineer_badge_candidature_proposal_responses {
      is_approved
    }
  }
  engineer_to_manager_badge_candidature_proposals(where: {manager: {_eq: 1}}) {
    id
    badge_id
    badge_version
    created_at
    created_by
    manager
  }
}`

export const UPDATE_ISSUING_REQUEST_REJECTION = gql`
  mutation IssueRefused($id: Int!) {
    update_issuing_requests(
      where: { request_id: {}, id: { _eq: $id } }
      _set: { disapproval_motivation: "R.I.P", is_approved: false }
      _inc: {}
    ) {
      returning {
        disapproval_motivation
        is_approved
        badge_candidature_request {
          candidature_evidences
          badge_version
        }
        request_id
      }
    }
  }
`;

export const UPDATE_ISSUING_REQUEST_APPROVAL = gql`
  mutation IssueApproved($id: Int!) {
    update_issuing_requests(
      _set: { disapproval_motivation: "Well Done", is_approved: true }
      where: { id: { _eq: $id } }
    ) {
      returning {
        disapproval_motivation
        id
        is_approved
        request_id
      }
    }
  }
`;
