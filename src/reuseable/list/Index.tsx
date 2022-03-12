import { Card } from "@mui/material";
import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import { useNavigate } from "react-router";

import "./list.css";

type Props = {
  columns: any;
  data: any;
  addButton?: any;
  url?: string;
};

export default function List(props: Props) {
  const { columns, data, addButton, url } = props;
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Card
      sx={{ minWidth: 275, margin: "32px", color: "grey", padding: "32px" }}
      elevation={6}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {addButton}
      </div>
      <div style={{ marginTop: "10px" }}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps}
                  onClick={() => {
                    navigate(`/${url}/${row.values.id}`);
                  }}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
