import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Box, Card, Link, Container, Typography } from "@material-ui/core";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { RegisterForm } from "../../components/authentication/register";
import AuthSocial from "../../components/authentication/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
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

export default function Register() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
              Register
            </Typography>
            <RegisterForm />
          </Box>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
