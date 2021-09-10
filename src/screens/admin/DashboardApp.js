// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../../components/Page";
import {
  AppWeeklySales,
  AppBugReports,
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits,
  AppItemOrders,
  AppNewsUpdate,
  AppNewUsers,
  AppOrderTimeLine,
  AppTasks,
} from "../../components/_dashboard/app";
import { DestinationList } from "../../components/_dashboard/app";
import destination from "../../_mocks_/destination";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Explore Sri Lanka</Typography>
        </Box>

        <DestinationList destinations={destination} />
      </Container>
    </Page>
  );
}
