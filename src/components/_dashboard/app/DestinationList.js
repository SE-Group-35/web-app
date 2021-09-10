import PropTypes from "prop-types";
// material
import { Grid } from "@material-ui/core";
import DestinationCard from "./DestinationCard";

// ----------------------------------------------------------------------

DestinationList.propTypes = {
  destinations: PropTypes.array.isRequired,
};

export default function DestinationList({ destinations, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {destinations.map((destination) => (
        <Grid key={destination.src} item xs={12} sm={6} md={3}>
          <DestinationCard destination={destination} />
        </Grid>
      ))}
    </Grid>
  );
}
