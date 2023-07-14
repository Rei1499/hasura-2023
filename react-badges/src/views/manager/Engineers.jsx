import { useEffect, useState } from "react";
import withApollo from "../../state/with-apollo";
import { gql, useMutation } from "@apollo/client";
import { userColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import Button from "@mui/material/Button";
import { useAuth } from "../../state/with-auth";
import { useNavigate } from "react-router-dom";

const Engineers = () => {
  const [engineers, setEngineers] = useState([]);
  const [managerId, setManagerId] = useState();

  const updatedColumns = [
    ...userColumns,
    {
      field: "actions",
      headerName: "Propose Badge",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row.id)}
        >
          Button
        </Button>
      )
    }
  ];
  const MY_MUTATION = gql`
    mutation MyMutation($managerId: Int!) {
      get_engineers_by_manager(args: { manager_id: $managerId }) {
        created_at
        id
        modified_at
        name
        roles
      }
    }
  `;
  const auth = useAuth();
  useEffect(() => {
    setManagerId(auth.hasura["x-hasura-tenant-id"]);
  }, []);

  const [executeMutation, { loading, error, data }] = useMutation(MY_MUTATION);

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate("/proposalform");
    console.log(`Button clicked for row with ID: ${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (managerId !== null && managerId !== undefined) {
          const result = await executeMutation({
            variables: { managerId }
          });
          setEngineers(result.data.get_engineers_by_manager);
        }
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    };

    fetchData();
  }, [managerId, executeMutation]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(engineers);
  console.log(managerId, "managerId");

  return (
    <>
      <div>
        <Table row={engineers} columns={updatedColumns} />
      </div>
    </>
  );
};

export default withApollo(Engineers);
