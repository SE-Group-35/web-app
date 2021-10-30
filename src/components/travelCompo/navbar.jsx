import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItems } from './menuItems';
import { Link, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { PRIMARY,WHITE } from "../../colors";
import Dropdown from "./dropDown";
import { useRef, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {signOut , getProfile} from '../../store/auth'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuPopover from '../MenuPopover';
import { alpha } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Button, Box, Divider } from "@material-ui/core";
import personFill from "@iconify/icons-eva/person-fill";

const useStyles = makeStyles((theme) => ({  
  styledText:{
    fontStyle:'italic',
    fontSize:'1.3rem',
    fontWeight:'bold',
    color:WHITE, 
    textDecorationLine:'underline'  
  }, 
  avatar:{
    margin:theme.spacing(0,50)
  },
  notification:{
    margin:theme.spacing(0,35),
  },
  button: {
    width: "100%",
    height: "3.9rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: WHITE,
    fontSize: "2rem",
    border: 0,
    margin:theme.spacing(2,-5)
  },
}));

const MENU_OPTIONS = [
  
  {
    label: "Profile",
    icon: personFill,
    linkTo: "/traveller/profile",
  },
  
];

export default function Navbar(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const classes = useStyles();  
  const [dropdown, setDropdown] = useState(false);
  const {post}=props; 
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { email, firstName } = useSelector(getProfile);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
      <Grid container item xs={12} >
        <Grid item xs={12} md={2} >
          <Link href="/">
            <Typography className={classes.styledText}>
              Home
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={2}>
          <Link href={`/traveller/myTrips/${post.userId}`} >
            <Typography className={classes.styledText}>
              My Trips
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={2}>
          {MenuItems.map((item) => {
            if (item.title === "Trip Planner") {
              return (
                <Grid
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>
                    <Typography className={classes.styledText}>
                      {item.title}
                    </Typography>
                  </Link>
                  {dropdown && <Dropdown />}
                </Grid>
              );
            }
          })}
        </Grid>
        <Grid item xs={12}  md={2} >
          <IconButton
            className={classes.avatar}
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              padding: 0,
              width: 44,
              height: 44,
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
            }}
          >
            <Avatar  alt="photoURL"/>
          </IconButton>
          <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{ width: 220 }}
          >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {firstName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {email}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
            {MENU_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                to={option.linkTo}
                component={RouterLink}
                onClick={handleClose}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
              >
                <Box
                  component={Icon}
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />

                {option.label}
              </MenuItem>
            ))}

            <Box sx={{ p: 2, pt: 1.5 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                onClick={() => {
                  dispatch(signOut());
                  navigate("/home");
                }}
              >
                Logout
              </Button>
            </Box>
          </MenuPopover>                    
        </Grid>
        <Grid item xs={12} md={2} >
          <NotificationsIcon className={classes.notification}/>
        </Grid>
        </Grid>
  );
  
}