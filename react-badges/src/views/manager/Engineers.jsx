import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { userColumns } from "../../components/reUsable/DataTable";
import Table from "../../components/reUsable/Table";
import Button from "@mui/material/Button";
import { useAuth } from "../../state/with-auth";

import { useNavigate } from "react-router-dom";
import { GET_ENGINEERS_BY_MANAGER } from "../../queries/BadgeEngineerMutations";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Engineers = () => {
  const [engineers, setEngineers] = useState([]);
  const [executeMutation, { loading, error, data }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const updatedColumns = [
    ...userColumns,
    {
      field: "actions",
      headerName: "Propose Badge",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row.id)}
        >
          Propose
        </Button>
      )
    }
  ];

  const auth = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (engineerId) => {
    navigate(`/proposalform`, { state: { engineerId } });
    console.log(`Button clicked for row with ID: ${engineerId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await executeMutation({
          variables: { managerId: auth.userId }
        });
        setEngineers(result.data.get_engineers_by_manager);
      } catch (error) {
        console.error("Error fetching engineers:", error);
      }
    };

    fetchData();
  }, []);

  const LoadingMessage = styled("p")({
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
    padding: "20px"
  });

  const ErrorMessage = styled("p")({
    fontSize: "18px",
    color: "#ff0000",
    textAlign: "center",
    padding: "20px"
  });

  const NoDataMessage = styled("p")({
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
    padding: "20px"
  });
  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;
  if (!data || data.get_engineers_by_manager.length < 1)
    return <NoDataMessage>No Data to show</NoDataMessage>;

  console.log(data, "data");

  return (
    <>
      <Typography
        variant="h4" // Use the desired heading variant (h1, h2, h3, h4, etc.)
        align="center" // Align the title to the center
        sx={{ margin: "20px 0", fontWeight: "bold", color: "#333" }} // Apply custom styles
      >
        List of Engineers
      </Typography>
      <Box sx={{ width: "75%", margin: "20px auto 0" }}>
        <Table row={engineers} columns={updatedColumns} />
      </Box>
    </>
  );
};

export default Engineers;
