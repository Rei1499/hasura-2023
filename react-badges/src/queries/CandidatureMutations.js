import { gql } from "@apollo/client";

export const GET_PROPOSALS_WITH_STATUS = gql`
  query getProposalsWithStatus($managerId: Int!) {
    manager_to_engineer_badge_candidature_proposals(
      where: { user: { id: { _eq: $managerId } } }
    ) {
      id
      proposal_description
      badge_id
      badge_version
      engineer
      engineer_badge_candidature_proposal_responses {
        is_approved
        disapproval_motivation
      }
    }
    engineer_to_manager_badge_candidature_proposals(
      where: { manager: { _eq: $managerId } }
    ) {
      id
      badge_id
      proposal_description
      badge_version
      created_at
      created_by
      manager
      manager_badge_candidature_proposal_responses {
        is_approved
        disapproval_motivation
      }
    }
  }
`;

export const APPROVE_CANDIDATURE_PROPOSAL = gql`
  mutation approveCandidatureProposal($proposalId: Int!) {
    insert_manager_badge_candidature_proposal_response(
      objects: {
        is_approved: true
        created_at: "now()"
        created_by: 2
        disapproval_motivation: ""
        proposal_id: $proposalId
      }
      on_conflict: {
        constraint: manager_badge_candidature_proposal_response_pkey
      }
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
  mutation disapproveCandidatureProposal(
    $proposalId: Int!
    $disapprovalMotivation: String!
  ) {
    insert_manager_badge_candidature_proposal_response(
      objects: {
        is_approved: false
        created_at: "now()"
        created_by: 2
        disapproval_motivation: $disapprovalMotivation
        proposal_id: $proposalId
      }
      on_conflict: {
        constraint: manager_badge_candidature_proposal_response_pkey
      }
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
  mutation createProposalManager(
    $engineerId: Int!
    $badgeId: Int!
    $badgeCreatedAt: timestamp!
    $proposalDescription: String!
    $createdBy: Int!
  ) {
    insert_manager_to_engineer_badge_candidature_proposals_one(
      on_conflict: {
        constraint: manager_to_engineer_badge_candidature_proposals_pkey
      }
      object: {
        engineer: $engineerId
        badge_id: $badgeId
        badge_version: $badgeCreatedAt
        proposal_description: $proposalDescription
        created_by: $createdBy
      }
    ) {
      id
      badge_version
      engineer
      proposal_description
    }
  }
`;
