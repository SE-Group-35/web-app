import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',    
    margin: theme.spacing(7, 0),
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    borderWidth:'6',
    borderColor: 'PRIMARY'
  },
  
}));

export default function Searchbar() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        variant="contained"        
        className={classes.input}
        placeholder="Search Your Destination"
      />
    </Paper>
  );
}