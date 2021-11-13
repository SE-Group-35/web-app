// material
import { styled } from "@material-ui/core/styles";

import { Box, Container, Typography } from "@material-ui/core";

// layouts

// components
import Page from "../../components/Page";

import RegisterForm from "../../components/Forms/RegisterForm";

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function AddUser() {
  return (
    <RootStyle title="Add User | Minimal-UI">
      <Container>
        <ContentStyle>
          <Box sx={{ shadow: 3 }}>
            <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
              Add User
            </Typography>
            <Container>
              <RegisterForm
                firstName=""
                lastName=""
                email=""
                telephone=""
                userRole={{ admin: false, traveller: true }}
                title="Add"
              />
            </Container>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
