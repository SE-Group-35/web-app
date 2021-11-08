import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    dialogStyle: {
      padding:theme.spacing(2),
      position:"absolute"   
    }
}));  
export default function Loader() {
    const classes = useStyles();
   return (
    <div>
           
      <Dialog >
        <Typography>Add reviews</Typography>
      
      </Dialog>
      
    </div>
  );
}