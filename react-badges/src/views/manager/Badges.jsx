import React from "react";
import BadgeCard from "../../components/reUsable/BadgeCard";
import Table from "../../components/reUsable/Table";

const Badges = () => {
  const row1 = [
    {
      name: "Luke Skywalker",
      id: 1,
      roles: ["engineer", "backoffice"]
    },
    {
      name: "Yoda",
      id: 7,
      roles: ["engineer"]
    },
    {
      name: "Chewbacca",
      id: 8,
      roles: ["engineer"]
    }
  ];
  return (
    <>
      <div>Badges</div>
    </>
  );
};

export default Badges;
