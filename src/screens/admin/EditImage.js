import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/styles";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useParams } from "react-router";
import { database } from "../../firebase";

// ----------------------------------------------------------------------
import Page from "../../components/Page";
import AddEventForm from "../../components/Forms/AddEventForm";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  if (JSON.stringify(EVENT) === "{}") {
    return <CircularProgress />;
  } else {
    const { title, description, venue, date, url, published, overview } = EVENT;

    return (
      <RootStyle title="Edit Event |Admin">
        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
                Edit Event
              </Typography>
            </Box>

            <AddEventForm
              title={title}
              description={description}
              venue={venue}
              date={date}
              url={url}
              published={published}
              name={"Edit"}
              overview={overview}
              id={id}
            />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
