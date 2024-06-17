import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Adjust the import path if necessary

function DataTable({ data, columns }) {
  const renderCellContent = (item, column) => {
    if (column.custom) {
      return column.custom(item);
    } else {
      return item[column.key];
    }
  };

  return (
    <Table>
      {/* TableHeader with columns mapped to TableHead cells */}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* TableBody with data mapped to TableRows */}
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {renderCellContent(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
