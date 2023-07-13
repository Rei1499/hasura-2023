import React from "react";
import IssuingRequests from "./Issues/IssuingRequest";
import { gql, useQuery } from "@apollo/client";

const IssueComponent = () => {
  const GET_MANAGERS = gql`
    query getManagersAndEngineers {
      manager {
        id
        name
      }
      engineers {
        id
        name
      }
    }
  `;

  const r1 = useQuery(GET_MANAGERS);
  const managerId = r1.data.manager.id;
  return (
    <>
      <IssuingRequests managerId={managerId} />
    </>
  );
};

export default IssueComponent;
