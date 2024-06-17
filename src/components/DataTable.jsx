import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Adjust the import path if necessary
import { Button } from "./ui/button";

function DataTable({
  data,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) {
  const renderCellContent = (item, column) => {
    if (column.custom) {
      return column.custom(item);
    } else {
      return item[column.key];
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

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
      <div className="flex justify-start gap-2 mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
}

export default DataTable;
