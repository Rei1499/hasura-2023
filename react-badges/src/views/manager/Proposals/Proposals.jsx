import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogContent
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAuth } from "../../../state/with-auth";
import { GET_PROPOSALS_WITH_STATUS } from "../../../queries/CandidatureMutations";
import { useNavigate } from "react-router-dom";
import {
  proposalColumnsFromManager,
  proposalColumnsToManager
} from "../../../components/reUsable/DataTable";
import { makeStyles } from "@mui/styles";
import {
  ErrorMessage,
  LoadingWithCircularProgress,
  NoDataMessage
} from "../../../layouts/MessagesLayout/Messages";
import ProposalActionButtons from "../../../containers/Proposals/ProposalActionButtons";
import { updateCacheWithNewRows } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  paragraph: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    position: "relative",
    padding: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[4],
    marginBottom: theme.spacing(2)
  },
  gridContainer: {
    marginTop: theme.spacing(2)
  },
  customDataGrid: {
    "& .MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none" // Remove focus outline
    }
  },
  dialogContent: {
    padding: theme.spacing(2),
    minWidth: 400
  }
}));
const Proposals = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openFirstTableDialog, setOpenFirstTableDialog] = useState(false);

  const { loading, error, data, refetch } = useQuery(
    GET_PROPOSALS_WITH_STATUS,
    {
      variables: { managerId: auth.userId }
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  
  const handleCloseFirstTableDialog = () => {
    setOpenFirstTableDialog(false);
  };

  const handleRowClickFirstTable = (params) => {
    setSelectedRowData(params.row);
    setOpenFirstTableDialog(true);
  };

  const handleRowClick = (params, event) => {
    const isActionsColumn =
      event && event.target && event.target.tagName === "BUTTON";

    if (!isActionsColumn) {
      setSelectedRowData(params.row);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <LoadingWithCircularProgress />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!data) return <NoDataMessage />;

  const rowsFromManager =
    data?.manager_to_engineer_badge_candidature_proposals || [];
  const rowsToManager =
    data?.engineer_to_manager_badge_candidature_proposals || [];

  const updatedColumnsToManager = [
    ...proposalColumnsToManager,
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <ProposalActionButtons
          rowId={params.row.id}
          approvalStatus={
            params.row.manager_badge_candidature_proposal_responses.length === 0
              ? "Pending"
              : params.row.manager_badge_candidature_proposal_responses[0]
                  .is_approved === true
              ? "Approved"
              : "Rejected"
          }
          refetch={refetch}
        />
      )
    }
  ];

  return (
    <Grid className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title}>
          Proposals
        </Typography>
        <Typography paragraph className={classes.paragraph}>
          Inside this page, you will find all the proposals created by you as
          well as the proposals that require your approval.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1" className={classes.title}>
            Proposals Created From You
          </Typography>
          {rowsFromManager.length > 0 ? (
            <DataGrid
              rows={rowsFromManager}
              columns={proposalColumnsFromManager}
              hideFooter
              disableSelectionOnClick
              className={classes.customDataGrid}
              onRowClick={handleRowClickFirstTable}
            />
          ) : (
            <Typography variant="h4">No Proposals Found.</Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Paper className={classes.paper}>
          <Typography variant="h1" className={classes.title}>
            Proposals Coming To You
          </Typography>
          {rowsToManager.length > 0 ? (
            <DataGrid
              rows={rowsToManager}
              columns={updatedColumnsToManager}
              refetch={refetch}
              hideFooter
              disableSelectionOnClick
              className={classes.customDataGrid}
              filterMode="server"
              onRowClick={(params, event) => handleRowClick(params, event)}
            />
          ) : (
            <Typography variant="h4">No Proposals Found.</Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            navigate("/proposalform");
          }}
        >
          Create Proposal Form
        </Button>
      </Grid>
      <Dialog
        open={openFirstTableDialog}
        onClose={handleCloseFirstTableDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {selectedRowData && (
            <Grid container spacing={2}>
              {proposalColumnsFromManager.map((column) => (
                <Grid item xs={6} key={column.field}>
                  <Typography variant="subtitle1">
                    {column.headerName}
                  </Typography>
                  <Typography variant="body1">
                    {column.field ===
                    "engineer_badge_candidature_proposal_responses" ? (
                      selectedRowData[column.field]?.length > 0 ? (
                        <>
                          is_approved:{" "}
                          {selectedRowData[column.field][0]?.is_approved
                            ? "Approved"
                            : "Rejected"}
                          , disapproval_motivation:{" "}
                          {selectedRowData[column.field][0]
                            ?.disapproval_motivation || "N/A"}
                        </>
                      ) : (
                        "Pending"
                      )
                    ) : (
                      selectedRowData[column.field] || "N/A"
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          {selectedRowData && (
            <Grid container spacing={2}>
              {updatedColumnsToManager.map((column) => (
                <Grid item xs={6} key={column.field}>
                  <Typography variant="subtitle1">
                    {column.headerName}
                  </Typography>
                  <Typography variant="body1">
                    {column.field ===
                    "manager_badge_candidature_proposal_responses" ? (
                      selectedRowData[column.field]?.length > 0 ? (
                        <>
                          is_approved:{" "}
                          {selectedRowData[column.field][0]?.is_approved
                            ? "Approved"
                            : "Rejected"}
                          , disapproval_motivation:{" "}
                          {selectedRowData[column.field][0]
                            ?.disapproval_motivation || "N/A"}
                        </>
                      ) : (
                        "Pending"
                      )
                    ) : (
                      selectedRowData[column.field] || "N/A"
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Proposals;
