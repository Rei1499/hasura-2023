import React from "react";
import IssuingRequests from "./Issues/IssuingRequest";
import { useAuth } from "../../state/with-auth";

const IssueComponent = () => {
  const auth = useAuth();

  const role = auth.hasura["x-hasura-tenant-id"];
  return (
    <>
      <IssuingRequests managerId={role} />
    </>
  );
};

export default IssueComponent;
