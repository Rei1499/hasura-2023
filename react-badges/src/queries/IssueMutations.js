import { gql } from "@apollo/client";

export const GET_ISSUING_REQUESTS_FOR_MANAGER = gql`
query getIssueRequests {
  issuing_requests_view(where: {is_issued: {_eq: true}}) {
    badge_description
    badge_title
    engineer_id
    engineer_name
    manager_id
    id
  }
}

`;

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
