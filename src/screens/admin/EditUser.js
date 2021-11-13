// material
import { styled } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import { Box, Container, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { database } from "../../firebase";

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
  const { id } = useParams();

  console.log(id);
  const [USER, setUSER] = useState({});
  useEffect(() => {
    async function fetchUser() {
      await database
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());

          setUSER(snapshot.data());
        });
    }
    fetchUser();
  }, [database]);

  if (JSON.stringify(USER) === "{}") {
    return <CircularProgress />;
  } else {
    const { firstName, lastName, email, telephone, Enabled, userRole } = USER;

    return (
      <RootStyle title="Edit User | Minimal-UI">
        <Container>
          <ContentStyle>
            <Box sx={{ shadow: 3 }}>
              <Typography variant="h3" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
                Edit User
              </Typography>
              <Container>
                <RegisterForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  telephone={telephone}
                  userRole={userRole}
                  title="Edit"
                  id={id}
                />
              </Container>
            </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
