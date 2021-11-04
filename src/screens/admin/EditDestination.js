import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/styles";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { database } from "../../firebase";

// ----------------------------------------------------------------------
import Page from "../../components/Page";
import AddDestinationForm from "../../components/Forms/AddDestinationForm/AddDestinationForm";
import { useDispatch } from "react-redux";

export default function EditDestination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [DESTINATION, setDESTINATION] = useState({});
  useEffect(() => {
    async function fetchDestination() {
      await database
        .collection("destinations")
        .doc(id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());
          //const USERS = firebaseLooper(snapshot);

          setDESTINATION(snapshot.data());
        });
    }
    fetchDestination();
  }, [database]);

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  }));

  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  }));

  if (JSON.stringify(DESTINATION) === "{}") {
    return <CircularProgress />;
  } else {
    const {
      title,
      description,
      address,
      categories,
      mainPhoto,
      published,
      overview,
      coords,
    } = DESTINATION;

    return (
      <RootStyle title="Edit Destination |Admin">
        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
                Edit Destination
              </Typography>
            </Box>

            <AddDestinationForm
              title={title}
              description={description}
              Selected={categories}
              Address={address}
              url={mainPhoto}
              published={published}
              overview={overview}
              name="Edit"
              Coords={coords}
              id={id}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
