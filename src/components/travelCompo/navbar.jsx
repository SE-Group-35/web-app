import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItems } from './menuItems';
import { Link, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { PRIMARY,WHITE } from "../../colors";
import Dropdown from "./dropDown";
import { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {signOut} from '../../store/auth'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({  
  styledText:{
    fontStyle:'italic',
    fontSize:'1.3rem',
    fontWeight:'bold',
    color:WHITE, 
    textDecorationLine:'underline'  
  }, 
  avatar:{
    margin:theme.spacing(0,30)
  },
  notification:{
    margin:theme.spacing(0,15),
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

export default function Navbar(props) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const classes = useStyles();
  const [dropdown, setDropdown] = useState(false);
  

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
          <Link href="./traveller/myTrips">
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
        <Grid item xs={12}  md={2}>
          <Avatar src="#"  className={classes.avatar}/>
        </Grid>
        <Grid item xs={12} md={2} >
          <NotificationsIcon className={classes.notification}/>
        </Grid>
        <Grid item xs={12} md={2} >
          <button type="submit" onClick={() => {
              dispatch(signOut());
              navigate("/home");
            }}>Logout</button>
        </Grid>
      </Grid>
  );
  
}