import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@material-ui/core";
// components
import Page from "../../components/Page";
import { BlogPostCard } from "../../components/_dashboard/event";

import { useDispatch } from "react-redux";
import EventListToolbar from "../../components/_dashboard/event/EventListToolBar";
//import { changeProcess } from "../../store/entities/users";
import { filter } from "lodash-es";
import { database } from "../../firebase";

import { firebaseLooper } from "../../utils/firebaseLooper";
import { useSelector } from "react-redux";
import { getProcessStatus, getFetchStatus } from "../../store/system";

import {
  fetchRequested,
  fetchCompleted,
  fetchFailed,
} from "../../store/system";

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

export default function Event() {
  const dispatch = useDispatch();
  const processStatus = useSelector(getProcessStatus);
  const fetchStatus = useSelector(getFetchStatus);

  const [EVENTLIST, setEVENTLIST] = useState([]);
  useEffect(() => {
    async function fetchEvent() {
      dispatch(fetchRequested());
      await database
        .collection("events")
        .get()
        .then((snapshot) => {
          const EVENTS = firebaseLooper(snapshot);

          setEVENTLIST(EVENTS);
        });
      dispatch(fetchCompleted());
    }

    fetchEvent();
    console.log("Fetched");
  }, [processStatus]);

  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("title");

  const [filterName, setFilterName] = useState("");

  const handleFilterByTitle = (event) => {
    setFilterName(event.target.value);
  };

  const filteredEvents = applySortFilter(
    EVENTLIST,
    getComparator(order, orderBy),
    filterName
  );

  if (EVENTLIST.length === 0 || processStatus == true || fetchStatus == true) {
    return <CircularProgress />;
  } else {
    return (
      <Page title="Dashboard: Event | Admin">
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Event
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/addEvent"
              /*onClick={() => {
              dispatch(changeProcess());
            }}*/
              startIcon={<Icon icon={plusFill} />}
            >
              New Event
            </Button>
          </Stack>

          <Stack
            mb={5}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <EventListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByTitle}
            />
          </Stack>

          <Grid container spacing={3}>
            {filteredEvents.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </Container>
      </Page>
    );
  }
}
