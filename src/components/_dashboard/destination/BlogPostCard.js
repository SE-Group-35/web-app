import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";

// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Switch,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@material-ui/core";

import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import { useDispatch } from "react-redux";
import {
  deleteDestination,
  togglePublished,
} from "../../../store/entities/destinations";
// utils

//

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

/*const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));*/

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
  const {
    id,
    title,
    address,

    description,
    mainPhoto,
    categories,

    published,
    tags,
  } = post;
  const dispatch = useDispatch();
  const [switchState, setSwitchState] = useState(published);

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
    dispatch(togglePublished(id));
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
          <CoverImgStyle alt={title} src={mainPhoto} />
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
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {address}
          </Typography>

          <Stack direction="row">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              Categories :
            </Typography>

            {categories.map((category) => (
              <Typography
                key={category}
                gutterBottom
                variant="caption"
                sx={{
                  color: "text.disabled",
                  display: "block",
                  marginRight: 1,
                }}
              >
                {category}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row">
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block", marginRight: 1 }}
            >
              Activities :
            </Typography>

            {tags.map((tag) => (
              <Typography
                key={tag}
                gutterBottom
                variant="caption"
                sx={{
                  color: "text.disabled",
                  display: "block",
                  marginRight: 1,
                }}
              >
                {tag}
              </Typography>
            ))}
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
              {/*
              <MenuItem
                component={Button}
                onClick={async () => {
                  await dispatch(deleteDestination(id));
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
              </MenuItem>*/}

              <MenuItem
                component={RouterLink}
                to={`/dashboard/editDestination/${id}`}
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
        </CardContent>
      </Card>
    </Grid>
  );
}
