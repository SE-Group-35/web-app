import React from "react";
import {
  Typography,
  Avatar,
  Stack,
  Container,
  Grid,
  CardActionArea,
  CardContent,
  CardActions,
  TableRow,
  TableCell,
  Card,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { getProfile } from "../../store/auth";
import { getAuth } from "../../store/auth";
import { useSelector } from "react-redux";

const styles = {
  container: {
    backgroundColor: "#FFF",
    padding: "2rem",
    borderRadius: "20px",
    height: "100%",
  },
  profilePic: {
    height: "80%",
    width: "80%",
    borderRadius: "50%",
    border: "5px",
    borderStyle: "solid",
    borderColor: "#555",
  },
  emailField: {
    width: "40%",
  },
};

function Profile() {
  //console.log(account);
  const { firstName, lastName, email, telephone } = useSelector(getProfile);
  const { uid } = useSelector(getAuth);
  return (
    <Container fixed style={styles.container}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* <Grid  xs={2} item></Grid> */}
          <Grid xs={3} item>
            <Card>
              <CardActionArea>
                <Grid
                  xs={12}
                  style={{
                    textAlign: "cenetr",
                    margin: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  item
                >
                  <Avatar style={{ height: "100px", width: "100px" }}>
                    {"Admin".charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Admin
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    About content
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  component={RouterLink}
                  to={`/dashboard/editUser/${uid}`}
                  size="small"
                  color="info"
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={8} item>
            <Card>
              <CardActionArea>
                <CardContent>
                  <TableRow textAlign="center">
                    <TableCell size="medium">
                      <b>First Name</b>
                    </TableCell>
                    <TableCell size="medium">{firstName}</TableCell>
                    <TableCell size="medium">
                      <b>Last Name</b>
                    </TableCell>
                    <TableCell size="medium">{lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="medium">
                      <b>Email</b>
                    </TableCell>
                    <TableCell size="medium">{email}</TableCell>
                    <TableCell size="medium">
                      <b>Mobile Number</b>
                    </TableCell>
                    <TableCell size="medium">{telephone}</TableCell>
                  </TableRow>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Profile;
