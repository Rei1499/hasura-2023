import React from "react";
import IssuingRequests from "./Issues/IssuingRequest";

const IssueComponent = () => {
  const managerId = 2;
  return (
    <>
      <IssuingRequests managerId={managerId} />
    </>
  );
};

export default IssueComponent;
