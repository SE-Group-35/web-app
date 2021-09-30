import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import personFill from "@iconify/icons-eva/person-done-fill";

// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Typography,
  CardContent,
  Stack,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  IconButton,
  Button,
  Switch,
} from "@material-ui/core";
// utils

import { fromTimestamp } from "../../../utils/toTimestamp";

//
import SvgIconStyle from "../../SvgIconStyle";
import { deleteEvent, togglePublished } from "../../../store/entities/events";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const InfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { title, description, date, published, url, venue, id } = post;
  const dispatch = useDispatch();

  const to = fromTimestamp(date.to.seconds);
  const from = fromTimestamp(date.from.seconds);

  const [switchState, setSwitchState] = useState(published);
  useEffect(() => {
    async function toggle() {
      if (switchState != published) {
        await dispatch(togglePublished(id, switchState));
      }
      toggle();
      console.log(switchState);
    }
  }, [switchState]);

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />

          <CoverImgStyle alt={title} src={url} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {title}
          </Typography>

          <Stack direction="row">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              From :
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              {from.dateNew}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              {from.time}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              To :
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              {to.dateNew}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {to.time}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              Venue :
            </Typography>

            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {venue}
            </Typography>
          </Stack>
          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {description}
          </TitleStyle>
          <Stack>
            <InfoStyle>
              <Switch
                checked={switchState}
                onChange={handleSwitchChange}
                value={switchState}
              />

              <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20} />
              </IconButton>

              <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                  sx: { width: 200, maxWidth: "100%" },
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={Button}
                  onClick={async () => {
                    await dispatch(deleteEvent(id));
                  }}
                  sx={{ color: "text.secondary" }}
                >
                  <ListItemIcon>
                    <Icon icon={trash2Outline} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delete"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </MenuItem>

                <MenuItem
                  component={RouterLink}
                  to={`/dashboard/editEvent/${id}`}
                  sx={{ color: "text.secondary" }}
                >
                  <ListItemIcon>
                    <Icon icon={editFill} width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </MenuItem>
              </Menu>
            </InfoStyle>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
