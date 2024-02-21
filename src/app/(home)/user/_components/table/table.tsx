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

import { EnhancedTableToolbar } from "./table-toolbar";
import { EnhancedTableHead } from "./table-header";
import Label from "@/components/label/label";
import { formatDate } from "@/package/util";
import IconButton from "@mui/material/IconButton";
import Iconify from "@/components/iconify/iconify";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { userAccountStatus } from "@/components/config";
import { User } from "@/package/api/user";
import {
  useSearchParamsNavigation,
  useGetSearchParams,
} from "@/hook/use-enchant-search-params";
import { apiClientFetch } from "@/package/api/api-fetch";
import { BanUserResponse } from "@/package/api/user/ban-user";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface Data extends User {}

type Order = "asc" | "desc";

export const UserTable = ({ data, total }: { data: Data[]; total: number }) => {
  const { page, rowsPerPage } = useGetSearchParams(["page", "rowsPerPage"]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("created");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const router = useRouter();

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleBanUser = async (userId: string) => {
    try {
      const res: BanUserResponse = await apiClientFetch("ban-user", {
        userIdList: [userId],
      });
      if (res.status === "error") {
        throw new Error(res.responseText);
      }
      enqueueSnackbar(res.responseText, { variant: "success" });
      // handleCloseMenu();
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      router.refresh();
      setDeleteId("");
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - data.length;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.email}
                    </TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>
                      <Label color={userAccountStatus[row.status].color}>
                        {userAccountStatus[row.status].name}
                      </Label>
                    </TableCell>
                    <TableCell>
                      {formatDate(row.created, "dd/MM/yyyy")}
                      {/* {row.created} */}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        disabled={deleteId !== ""}
                        onClick={(e) => {
                          handleOpenMenu(e);
                          setDeleteId(row.id);
                        }}
                      >
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={handleCloseMenu}
                  sx={{
                    width: 140,
                  }}
                >
                  <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                  Detail
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleBanUser(deleteId);
                  }}
                  sx={{ color: "error.main" }}
                >
                  <Iconify icon="mdi:ban" sx={{ mr: 2 }} />
                  Ban
                </MenuItem>
              </Popover>
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
