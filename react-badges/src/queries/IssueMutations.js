import { gql } from "@apollo/client";

export const GET_ISSUING_REQUESTS_FOR_MANAGER = gql`
  query getIssueRequests($managerId: Int_comparison_exp) {
    issuing_requests_view(where: { manager_id: $managerId }) {
      badge_id
      badge_title
      badge_version
      badge_description
      candidature_evidences
      engineer_id
      engineer_name
      is_issued
      manager_id
      id
    }
  }
`;

export const UPDATE_ISSUING_REQUEST_REJECTION = gql`
mutation IssueRefused($id: Int!, $disapprovalMotivation: String!) {
  update_issuing_requests(
    where: { request_id: { _eq: $id } }
    _set: { disapproval_motivation: $disapprovalMotivation, is_approved: false }
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
      _set: { is_approved: true }
      where: { request_id: { _eq: $id } }
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
