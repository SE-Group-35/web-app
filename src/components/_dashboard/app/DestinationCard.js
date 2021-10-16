import PropTypes from "prop-types";

// material
import { Box, Card, Typography, Stack } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
// utils

// ----------------------------------------------------------------------

const DestinationImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

DestinationCard.propTypes = {
  destination: PropTypes.object,
};

export default function DestinationCard({ destination }) {
  const { name, src } = destination;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <DestinationImgStyle alt={name} src={src} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
      </Stack>
    </Card>
  );
}
