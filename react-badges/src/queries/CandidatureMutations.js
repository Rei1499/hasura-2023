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

export const GET_PROPOSALS_WITH_STATUS = gql`
  query getProposalsWithStatus {
    manager_to_engineer_badge_candidature_proposals(
      where: { user: { id: { _eq: 2 } } }
    ) {
      id
      proposal_description
      badge_id
      badge_version
      engineer
      engineer_badge_candidature_proposal_responses {
        is_approved
      }
    }
    engineer_to_manager_badge_candidature_proposals(
      where: { manager: { _eq: 1 } }
    ) {
      id
      badge_id
      badge_version
      created_at
      created_by
      manager
    }
  }
`;

export const APPROVE_CANDIDATURE_PROPOSAL = gql`
  mutation approveCandidatureProposal {
    update_manager_badge_candidature_proposal_response(
      where: {
        user: { users_relations: { manager: { _eq: 2 } }, id: { _eq: 1 } }
        response_id: { _eq: 1 }
      }
      _set: { is_approved: true }
    ) {
      returning {
        disapproval_motivation
        is_approved
        proposal_id
        response_id
      }
    }
  }
`;

export const DISAPPROVE_CANDIDATURE_PROPOSAL = gql`
  mutation disapproveCandidatureProposal {
    update_manager_badge_candidature_proposal_response(
      where: {
        user: { users_relations: { manager: { _eq: 2 } }, id: { _eq: 1 } }
        response_id: { _eq: 1 }
      }
      _set: { is_approved: false, disapproval_motivation: "R.I.P" }
    ) {
      returning {
        disapproval_motivation
        is_approved
        proposal_id
        response_id
      }
    }
  }
`;

export const CREATE_PROPOSAL_MANAGER = gql`
  mutation createProposalManager {
    insert_manager_to_engineer_badge_candidature_proposals_one(
      on_conflict: {
        constraint: manager_to_engineer_badge_candidature_proposals_pkey
        where: {}
      }
      object: {
        badge_id: 1
        badge_version: "2023-07-11T14:40:02.292438"
        proposal_description: "TestTest123"
        engineer: 1
      }
    ) {
      id
      badge_id
      badge_version
      engineer
      proposal_description
    }
  }
`;
