import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from "@mui/material";

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((row) => {
    // Filter based on the search term
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      {/* Search Input */}
      <TextField
        label="Search"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "300px", // set the width
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px", // customize the input border radius
          },
          "& label": {
            color: "#455d7a",
            fontWeight: "bold",
          },
        }}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Assuming data[0] contains column names */}
              {Object.keys(data[0]).map((columnName, index) => (
                <TableCell key={index}>{columnName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                  <TableCell key={columnIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataTable;
