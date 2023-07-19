import { gql } from "@apollo/client";

export const GET_ENGINEERS_BY_MANAGER = gql`
  mutation getEngineersByManager($managerId: Int!) {
    get_engineers_by_manager(args: { manager_id: $managerId }) {
      created_at
      id
      modified_at
      name
      roles
    }
  }
`;

export const GET_BADGES_LAST = gql`
  query getLastVersionBadges {
    badges_versions_last {
      description
      id
      requirements
      title
      created_at
    }
  }
`;
