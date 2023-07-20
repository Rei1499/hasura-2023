import React from "react";
import { useQuery } from "@apollo/client";
import BadgeCard from "../../components/reUsable/BadgeCard";
import Box from "@mui/material/Box";
import { GET_BADGES_LAST } from "../../queries/BadgeEngineerMutations";

const Badges = () => {

  const { loading, error, data } = useQuery(GET_BADGES_LAST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { badges_versions_last } = data;

  console.log(badges_versions_last);
  return (
    <div>
      <Box
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {badges_versions_last &&
          badges_versions_last.map((item, index) => (
            <BadgeCard
              key={index}
              created={item.created_at}
              title={item.title}
              description={item.description}
              requirement={item.requirements}
            />
          ))}
      </Box>
    </div>
  );
};

export default Badges;
