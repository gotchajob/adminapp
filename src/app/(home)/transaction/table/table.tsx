"use client";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { EnhancedTableHead } from "./table-header";
import Label from "@/components/label/label";
import { formatDate, formatNumber } from "@/package/util";
import { useState } from "react";
import { orderStatus, userAccountStatus } from "@/components/config";
import {
  useSearchParamsNavigation,
  useGetSearchParams,
} from "@/hook/use-enchant-search-params";
import { useRouter } from "next/navigation";
import { OrderService } from "@/package/api/order-service";
import LoadingButton from "@mui/lab/LoadingButton";
import { apiClientFetch } from "@/package/api/api-fetch";
import { enqueueSnackbar } from "notistack";
import { Input } from "@/components/common/input/input";
import { UpdateAdviceStatusResponse } from "@/package/api/advice-service/update-status";
import { Transaction } from "@/package/api/transaction";

interface Data extends Transaction {}

type Order = "asc" | "desc";

export const TransactionTable = ({
  data,
  total,
}: {
  data: Data[];
  total: number;
}) => {
  const { page, rowsPerPage } = useGetSearchParams(["page", "rowsPerPage"]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const router = useRouter();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const { push } = useSearchParamsNavigation();
  const handleChangePage = (event: unknown, newPage: number) => {
    push([{ name: "page", value: (newPage + 1).toString() }], true);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    push([{ name: "rowsPerPage", value: event.target.value.toString() }], true);
  };

  const emptyRows = rowsPerPage - data.length;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.serviceName}</TableCell>
                    <TableCell>
                      {formatDate(row.createdAt, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell align="right">
                      {formatNumber(row.total)}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 55 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={+rowsPerPage}
          page={+page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
