import { gql } from "@apollo/client";

export const GET_CANDIDATURE_VIEW = gql`
  query getCandidatureView {
    badge_candidature_view(where: { manager_id: { _eq: 1 } }) {
      badge_description
      badge_title
      badge_requirements
      badge_version
      candidature_evidences
      created_at
      engineer_name
      is_issued
    }
  }
`;

export const CANDIDATURE_APPROVED = gql`
  mutation candidatureAppoved {
    update_badge_candidature_request(
      where: {
        engineer_id: { _eq: 2 }
        badge_id: { _eq: 1 }
        badge_version: { _eq: "2023-07-11T13:41:48.914754" }
      }
      _set: { is_issued: true }
    ) {
      returning {
        badge_id
        badge_version
        candidature_evidences
        engineer_id
        is_issued
        manager_id
      }
    }
  }
`;

export const CREATE_PROPOSAL_MANAGER = gql`
mutation createProposalManager {
    insert_manager_to_engineer_badge_candidature_proposals_one(on_conflict: {constraint: manager_to_engineer_badge_candidature_proposals_pkey, where: {}}, object: {badge_id: 1, badge_version: "2023-07-11T14:40:02.292438", proposal_description: "TestTest123", engineer: 1}) {
      id
      badge_id
      badge_version
      engineer
      proposal_description
    }

  `;
