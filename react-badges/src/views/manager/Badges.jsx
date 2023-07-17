import React from "react";
import { gql, useQuery } from "@apollo/client";
import withApollo from "../../state/with-apollo";
import { useAuth } from "../../state/with-auth";
import BadgeCard from "../../components/reUsable/BadgeCard";
import Box from "@mui/material/Box";

const BadgeQuery = gql`
  query MyQuery {
    badges_versions_last {
      description
      id
      requirements
      title
      created_at
    }
  }
`;
const Badges = () => {
  const auth = useAuth();
  console.log(auth, "auth");
  const { loading, error, data } = useQuery(BadgeQuery, {
    context: {
      headers: {
        authorization: `Bearer ${auth.token}`,
        "x-hasura-role": auth.role
      }
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { badges_versions_last } = data;

  console.log(badges_versions_last);
  return (
    <div>
      <Box
        sx={{
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
