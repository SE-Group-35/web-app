import { filter } from "lodash";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import SearchNotFound from "../../components/SearchNotFound";
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
// components
import Page from "../../components/Page";
import { BlogPostCard } from "../../components/_dashboard/destination";

import DestinationListToolbar from "../../components/_dashboard/destination/DestinationListToolBar";

//

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProcessStatus, getFetchStatus } from "../../store/system";
import { database } from "../../firebase";
import { fetchRequested, fetchCompleted } from "../../store/system";

import { firebaseLooper } from "../../utils/firebaseLooper";

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
      (_post) => _post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function Destination() {
  const processStatus = useSelector(getProcessStatus);
  const fetchStatus = useSelector(getFetchStatus);
  const dispatch = useDispatch();

  const [DESTINATIONLIST, setDESTINATIONLIST] = useState([]);
  useEffect(() => {
    async function fetchDestination() {
      dispatch(fetchRequested());
      await database
        .collection("destinations")
        .get()
        .then((snapshot) => {
          const DESTINATIONS = firebaseLooper(snapshot);
          console.log(DESTINATIONS);

          setDESTINATIONLIST(DESTINATIONS);
        });
      dispatch(fetchCompleted());
    }

    fetchDestination();
    console.log("Fetched");
  }, [processStatus]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("title");

  const [filterName, setFilterName] = useState("");

  const handleFilterByTitle = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPosts = applySortFilter(
    DESTINATIONLIST,
    getComparator(order, orderBy),
    filterName
  );
  if (
    DESTINATIONLIST.length === 0 ||
    processStatus == true ||
    fetchStatus == true
  ) {
    console.log(processStatus);
    return <CircularProgress />;
  } else {
    return (
      <Page title="Dashboard: Destination | Admin">
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Destination
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/addDestination"
              startIcon={<Icon icon={plusFill} />}
            >
              New Destination
            </Button>
          </Stack>

          <Stack
            mb={5}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <DestinationListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByTitle}
            />
          </Stack>

          <Grid container spacing={3}>
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
            {filteredPosts.length === 0 && (
              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                <SearchNotFound searchQuery={filterName} />
              </TableCell>
            )}
          </Grid>
        </Container>
      </Page>
    );
  }
}
