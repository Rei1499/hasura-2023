import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./DataTable";

const EngineerTable = ({ row }) => {
  return (
    <div>
      <DataGrid rows={row} columns={userColumns} />
    </div>
  );
};

export default EngineerTable;
