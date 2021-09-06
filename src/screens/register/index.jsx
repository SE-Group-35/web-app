import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import image from '../../assets/images/register.PNG';
import { Formik, Form } from "formik";
import * as Yup from "yup";

const logo = require('../../assets/images/logo.svg');

const validationSchema = Yup.object({    
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8, 'Minimum 8 characters required!').required('Required!'),
    repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must be the same!')
    .required('Required!'),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
        backgroundImage: `url("${image}")`,
        backgroundRepeat: 'no-repeat',      
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        background: '#00CEC9',        
        width:'100%',
        height:'10vh',
        margin: theme.spacing(3, 0, 2),
    },
    text:{
        fontSize: '2rem',
        display: 'block',
    },
    typography:{
        fontWeight:'bold',
        fontSize: '1rem',
        display: 'block',
        color: '#00CEC9',
        margin: theme.spacing(0, 0, -1),
    },
    buttontext:{
        display: 'block',        
        color: '#FFF'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    
  }));

const Register = () => {
    const classes = useStyles();
    return (
        <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
    
    >
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
            
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Grid align="center">
                <img src = {logo.default} alt = 'Logo'/>
            </Grid >
            <Typography  align="left" className={classes.text}  gutterBottom>
                Register
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <Typography className={classes.typography}  gutterBottom>
            First Name
        </Typography>    
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Enter your first name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography className={classes.typography}  gutterBottom>
            Last Name
        </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Enter your last name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
            />
            </Grid>
            <Grid item xs={12}>
            <Typography className={classes.typography}  gutterBottom>
            Email Address
        </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            </Grid>
            <Grid item xs={12}>
            <Typography className={classes.typography}  gutterBottom>
            Password
        </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter your password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            </Grid>
            <Grid item xs={12}>
            <Typography className={classes.typography}  gutterBottom>
            Repeat Password
        </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Re-enter your password"
                type="password"
                id="repeatPassword"
                
            />
            </Grid>
            </Grid>
            
            <Button
                type="submit"
                fullWidth            
                variant="contained"            
                className={classes.button}
            >
            <Typography variant="h5" className={classes.buttontext}  gutterBottom>
                    Register
                </Typography>
            </Button>
            <Grid container>
                <Grid item xs>
                    <Typography  variant="body2">
                    Already have an account?
                    </Typography>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Login"}
                    </Link>
                </Grid>
                </Grid>
            <Box mt={5}>
                
            </Box>
            </form>
        </div>
        </Grid>
    </Grid>
    </Formik>
    );
}
  


export default Register