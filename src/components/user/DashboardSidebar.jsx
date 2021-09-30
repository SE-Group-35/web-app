import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link,   Avatar } from "@material-ui/core";
import account from "./../../mocks/account";
import { PRIMARY, WHITE } from '../../colors';
import Navbar from './Navbar';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';


import sidebarConfig from './SidebarConfig';

const drawerWidth = 300;
const logo = require('../../assets/images/logo.svg');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logoImage: {
    margin: theme.spacing(3, 0),
    width: '100%',
    height: '100%'
    
},
text: {
    color: "black",
    fontSize: '1rem',
    margin: theme.spacing(0,2),
    fontWeight: 'bold'
},
navbar:{
    
    backgroundColor: 'White'
    
},
navbarText: {
  margin: theme.spacing(0,140),
  
}
}));
const AccountStyle = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    borderRadius: '1rem',
    backgroundColor: theme.palette.grey[200],
  }));


export default function DashboardSidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar 
        position="fixed"
       
      >
          <Grid className={classes.navbar}>
          
          
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon style={{backgroundColor: PRIMARY}} />
            
          </IconButton>
        
        
          
          
            <Avatar src="" style={{backgroundColor: PRIMARY, }} className={classes.navbarText}></Avatar>
            
        </Toolbar>
        </Grid>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
       
        
        <List>
        <div className={classes.paper}>
                <Grid >
                    <img src = {logo.default} alt = 'Logo'  className={classes.logoImage}/>
                </Grid >
                <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box >
              <Typography variant="subtitle2" className={classes.text}>
                {account.displayName}
              </Typography>
              
            </Box>
          </AccountStyle>
        </Link>
      </Box>
                </div>
          {['Trip Planner', 'My Trips', 'Backpack List', 'Gallery','Desinations','Nearby Destinations'].map((text, index) => (
            <ListItem button key={text} className={classes.text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />              
            </ListItem>
          ))}          
        </List>
        
        <Divider />
        
      </Drawer>
      
    </div>
  );
}