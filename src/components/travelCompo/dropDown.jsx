import React, { useState } from "react";
import { serviceDropdown } from "./menuItems";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    card: {
      borderRadius:'5%',
      padding:'10px',
    },
    list: {
      width: "100%",
      maxWidth: 360,
      backgroundColor:  theme.palette.common.white,
      margin: theme.spacing(0,0),
      position: "relative",
    },
    text:{
      color:'black',
      fontSize:'1rem',
      fontStyle:'italic',
      fontWeight:'bold'
    }
}));
function Dropdown() {
  const [dropdown, setDropdown] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Paper elevation={20}
         onClick={() => setDropdown(!dropdown)}
      >
        <Card className={classes.card} elevation={10}>
          {serviceDropdown.map((item) => {
            return (
              <Grid key={item.id} >         
                <Link
                  to={item.path}
                  className={classes.text}
                  onClick={() => setDropdown(false)}
                >
                  {item.title}
                </Link>
              </Grid>
            );
          })}
        </Card>
      </Paper>
    </>
  );
}

export default Dropdown;