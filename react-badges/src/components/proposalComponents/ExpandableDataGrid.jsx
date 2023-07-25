import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  gridContainer: {
    marginTop: theme.spacing(2)
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ExpandableDataGrid = ({ title, data, columns }) => {
  const classes = useStyles();
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRowClick = (params) => {
    setExpandedRowId(params.row.id === expandedRowId ? null : params.row.id);
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h3" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Paper className={classes.paper}>
        {data.length > 0 ? (
          <DataGrid
            treeData
            rows={data}
            columns={columns.map((column) => ({
              ...column,
              flex: 1,
              minWidth: 150
            }))}
            autoHeight
            onRowClick={handleRowClick}
            isRowExpandable={(params) =>
              params.row.id === expandedRowId && params.row.proposal_description
            }
            rowHeight={(params) =>
              params.row.id === expandedRowId && params.row.proposal_description
                ? params.row.proposal_description.split("\n").length * 25 + 150
                : 50
            }
            renderRowDetail={(params) => (
              <Box p={2}>
                <Typography variant="body1">
                  {params.row.proposal_description}
                </Typography>
              </Box>
            )}
            disableSelectionOnClick
          />
        ) : (
          <Typography variant="body1">No Proposals Found.</Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default ExpandableDataGrid;
