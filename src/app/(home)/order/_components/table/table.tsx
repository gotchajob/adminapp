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
import { formatDate } from "@/package/util";
import { useState } from "react";
import { orderStatus, userAccountStatus } from "@/components/config";
import {
  useSearchParamsNavigation,
  useGetSearchParams,
} from "@/hook/use-enchant-search-params";
import { useRouter } from "next/navigation";
import { OrderService } from "@/package/api/order-service";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserCurrentResponse } from "@/package/api/user/current";
import { apiClientFetch } from "@/package/api/api-fetch";
import { UpdateOrderStatusResponse } from "@/package/api/order-service/update-status";
import { enqueueSnackbar } from "notistack";

interface Data extends OrderService {}

type Order = "asc" | "desc";

export const OrderServiceTable = ({
  data,
  total,
  currentAdmin,
}: {
  currentAdmin: UserCurrentResponse;
  data: Data[];
  total: number;
}) => {
  const { page, rowsPerPage } = useGetSearchParams(["page", "rowsPerPage"]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("created");
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

  const handleUpdateOrderStatus = async (id: string, status: number) => {
    try {
      const res: UpdateOrderStatusResponse = await apiClientFetch(
        "update-order-status",
        { id, status }
      );
      if (res.status === "error") {
        throw new Error(res.responseText);
      }
      enqueueSnackbar(res.responseText, { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      router.refresh();
    }
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
                let disabled = false;
                let process = "";
                let params: { id: string; status: number } | null = null;
                if (row.status === 1) {
                  disabled = false;
                  params = { id: row.id, status: 2 };
                  process = "Accept";
                }

                if (row.status === 2) {
                  if (row.processingBy === currentAdmin.data.email) {
                    disabled = false;
                    params = { id: row.id, status: 3 };
                    process = "Complete";
                  } else {
                    disabled = true;
                    process = row.processingBy.slice(0, 5);
                  }
                }

                if (row.status === 3) {
                  disabled = false;
                  process = "Details";
                }

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.code || "nan"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>
                      <Label color={orderStatus[row.status].color}>
                        {orderStatus[row.status].name}
                      </Label>
                    </TableCell>
                    <TableCell>
                      {formatDate(row.created, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <LoadingButton
                        onClick={() => {
                          if (params) {
                            handleUpdateOrderStatus(params.id, params.status);
                          }
                        }}
                        sx={{ width: 80 }}
                        variant="contained"
                        disabled={disabled}
                        color={process === "Details" ? "success" : "primary"}
                      >
                        {process}
                      </LoadingButton>
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
