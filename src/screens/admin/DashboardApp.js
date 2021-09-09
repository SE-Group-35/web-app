// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../../components/Page";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            Hey
          </Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>
        </Grid>
      </Container>
    </Page>
  );
}
