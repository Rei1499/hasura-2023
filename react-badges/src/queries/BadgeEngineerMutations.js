import { gql } from "@apollo/client";

export const GET_ENGINEER_BY_MANAGER = gql`
  mutation getEngineerByManager {
    get_engineers_by_manager(args: { manager_id: 4 }) {
      id
      name
    }
  }
`;
