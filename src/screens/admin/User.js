import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import UserRow from "../../components/_dashboard/user/UserRow";
import { getUsersList } from "../../store/entities/users";
import { getProcessStatus } from "../../store/system";
import { useSelector } from "react-redux";
import { useFirebaseConnect, useFirestoreConnect } from "react-redux-firebase";

import { isLoaded } from "react-redux-firebase";

import { database } from "../../firebase";

import { firebaseLooper } from "../../utils/firebaseLooper";

// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import { CircularProgress } from "@mui/material";
// components
import Page from "../../components/Page";

import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
} from "../../components/_dashboard/user";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "First Name", label: "First Name", alignRight: false },
  { id: "Last Name", label: "Last Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },

  { id: "role", label: "Role", alignRight: false },

  { id: "status", label: "Status", alignRight: false },
  { id: "telephone", label: "Telephone", alignRight: false },

  { id: "button", label: "", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  //useFirestoreConnect({ collection: "users" });
  //const USERLIST = useSelector(getUsersList);
  const processStatus = useSelector(getProcessStatus);

  const [USERLIST, setUSERLIST] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      await database
        .collection("users")
        .get()
        .then((snapshot) => {
          const USERS = firebaseLooper(snapshot);

          setUSERLIST(USERS);
        });
    }
    fetchUser();
  }, [processStatus]);

  /*carsCollection
      .where("available", "==", true)
      .orderBy("price")
      .startAt(this.state.start)
      .endBefore(this.state.end)
      .get()
      .then((snapshot) => {
        const cars = firebaseLooper(snapshot);
        this.setState({
          cars,
        });
      });*/

  // useFirestoreConnect([{ collecton: "users" }]);
  //const USERLIST = useSelector(getUsersList);

  //console.log(USERLIST);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("firstName");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstName) => {
    const selectedIndex = selected.indexOf(firstName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstName);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;
  if (USERLIST.length === 0 || processStatus == true) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Page title="User | Admin">
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                User
              </Typography>

              <Button
                variant="contained"
                component={RouterLink}
                to="/dashboard/addUser"
                startIcon={<Icon icon={plusFill} />}
              >
                New User
              </Button>
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            firstName,
                            lastName,
                            userRole,
                            Enabled,
                            telephone,
                            avatarUrl,

                            email,
                          } = row;
                          const isItemSelected =
                            selected.indexOf(firstName) !== -1;

                          return (
                            <UserRow
                              id={id}
                              firstName={firstName}
                              lastName={lastName}
                              email={email}
                              userRole={userRole}
                              Enabled={Enabled}
                              telephone={telephone}
                              avatarUrl={avatarUrl}
                              isItemSelected={isItemSelected}
                              handleClick={handleClick}
                            />
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
      </>
    );
  }
}
