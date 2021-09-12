import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    typology: {
      color: 'black',
      fontStyle: 'italic',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: theme.spacing(0,10),
      textDecorationLine: 'underline'      
    },
    stylegrid: {
        margin: theme.spacing(0,0),                 
        borderRadius: '1rem'                  
    }
})) ;   



export default function UpperNavbar() {
    const classes = useStyles();
  
    return (        
        <Grid container spacing={1} className={classes.stylegrid}>            
            <Grid item xs={12} sm={3}>        
                <Link href="#" className={classes.typology} >
                    {"About Us"}
                </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Link href="#" className={classes.typology} >
                    {"Services"}
                </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Link href="/register" className={classes.typology} >
                    {"Register"}
                </Link>
            </Grid >
            <Grid item xs={12} sm={3}>
                <Link href="/login" className={classes.typology}  >
                    {"Login"}
                </Link>
            </Grid>                   
        </Grid>
    )};