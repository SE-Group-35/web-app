// material
import { Box, Container, Typography } from "@material-ui/core";

// components
import Page from "../../components/Page";

import { DestinationList } from "../../components/_dashboard/app";
import destination from "../../_mocks_/destination";
import SlideShow from "../../components/SlideShow";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Explore Sri Lanka</Typography>
          <Box m={2} />
          <SlideShow />
        </Box>
        <Box m={2} />

        <DestinationList destinations={destination} />
      </Container>
    </Page>
  );
}
