import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/styles";
import { Box, Container, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------
import Page from "../../components/Page";
import AddEventForm from "../../components/Forms/AddEventForm";

export default function AddEvent() {
  const navigate = useNavigate();

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

  return (
    <RootStyle title="Add Event |Admin">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
              Add Event
            </Typography>
          </Box>

          <AddEventForm
            title=""
            venue=""
            date={{ to: "", from: "" }}
            url=""
            published={false}
            name="Add"
            description=""
            overview=""
          />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
