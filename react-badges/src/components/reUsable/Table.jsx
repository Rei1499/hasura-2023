import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ row, columns }) => {
  return (
    <div>
      <DataGrid rows={row} columns={columns} />
    </div>
  );
};

export default Table;
