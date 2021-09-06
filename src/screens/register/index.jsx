import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import image from '../../assets/images/register.PNG';
import * as Yup from "yup";
import { useState } from 'react';
import { useFormik } from 'formik';
import InputTextBox from '../../components/common/InputTextBox';
import { PRIMARY, WHITE } from '../../colors';
import Spinner from '../../components/common/Spinner';

const logo = require('../../assets/images/logo.svg');


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
        width: '100%',
        height: '3.9rem',
        cursor: 'pointer',
        backgroundColor: PRIMARY,
        color: WHITE,
        fontSize: '2rem',
        border: 0,
        marginTop: '3rem'
    },
    text: {
        fontSize: '2rem',
        display: 'block',
    },
    typography: {
        fontWeight:'bold',
        fontSize: '1rem',
        display: 'block',
        color: PRIMARY,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    loginText:{
        fontWeight: 'bold',
        fontSize: '1rem',
        color: PRIMARY   
    },
    
  }));

const Register = () => {
    const classes = useStyles();

    const [ registerIn, setRegisterIn ] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",            
            email: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()            
            .required("Required field"),
            lastName: Yup.string()            
            .required("Required field"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required field"),
            password: Yup.string()
                .min(6, "Password must contain more than 6 characters")
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, "Password must contain minimum six characters, at least one letter, one number and one special character")
                .required("Required field"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Password must be the same!')
                .required('Required!'),
        }),

            onSubmit: async({ firstName,lastName,email, password,repeatPassword}) => {
                console.log("firstName", firstName);
                console.log("lastName", lastName);    
                console.log("email", email);
                console.log('password', password);
                console.log("repeatPassword", repeatPassword);
                try{
                    setRegisterIn(true);
                    //   await auth.signInWithEmailAndPassword(email, password);
                    //   setLogginIn(false);
                }catch(error){
                    setRegisterIn(false);
                    console.log(error);
                }
            },
    });


    return (
        
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

                <form onSubmit = {formik.handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.typography}  gutterBottom>
                                First Name
                            </Typography>    
                            <InputTextBox
                                variant="outlined"                
                                id="firstName"
                                placeholder="Enter your first name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                fullWidth
                                value = {formik.values.firstName}
                                onChange = {formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.typography}  gutterBottom>
                                Last Name
                            </Typography>
                            <InputTextBox
                                variant="outlined"                
                                id="lastName"                
                                placeholder="Enter your last name"
                                name="lastName"
                                autoComplete="lastName" 
                                fullWidth               
                                value = {formik.values.lastName}
                                onChange = {formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography className={classes.typography}  gutterBottom>
                                Email Address
                            </Typography>
                            <InputTextBox
                                variant="outlined"                
                                id="email"                
                                placeholder="Enter your email address"
                                name="email"
                                autoComplete="email"
                                fullWidth
                                onChange = {formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.typography}  gutterBottom>
                                Password
                            </Typography>
                            <InputTextBox
                                variant="outlined"                
                                fullWidth
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange = {formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.typography}  gutterBottom>
                                Repeat Password
                            </Typography>
                            <InputTextBox
                                variant="outlined"                
                                fullWidth
                                name="repeatPassword"
                                placeholder="Re-enter your password"
                                type="password"
                                id="repeatPassword"
                                onChange = {formik.handleChange}
                                error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                            />
                        </Grid>
                    </Grid>
                    
                    <button 
                        type = 'submit' 
                        className = {classes.button}
                        >
                        {registerIn ? <Spinner/> :'Register'}
                    </button>
                    <Box mt={2}></Box>                    
                    <Grid container>
                        <Grid item xs>
                            <Typography  variant="body2">
                                Already have an account?
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link href="/login" className={classes.loginText} >
                                {"Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    </Grid>
    
    );
}
  


export default Register;