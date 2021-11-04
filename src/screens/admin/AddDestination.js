import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/styles";
import { Box, Container, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------
import Page from "../../components/Page";
import AddDestinationForm from "../../components/Forms/AddDestinationForm/AddDestinationForm";
import { useDispatch } from "react-redux";

export default function AddDestination() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <RootStyle title="Add Destination |Admin">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
              Add Destination
            </Typography>
          </Box>

          <AddDestinationForm
            title=""
            description=""
            Selected={[]}
            Address=""
            url=""
            published={false}
            overview=""
            name="Add"
            Coords={["", ""]}
          />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
