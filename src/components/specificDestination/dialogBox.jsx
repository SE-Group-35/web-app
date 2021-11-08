import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addReview } from '../../store/entities/destination';
import * as Yup from "yup";
import { useFormik } from "formik";
import image from "../../assets/images/review.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputTextBox from "../../components/common/InputTextBox";
import { PRIMARY, WHITE } from "../../colors";
import Paper from "@material-ui/core/Paper";
const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles((theme) => ({
    dialogStyle: {
      padding:theme.spacing(2),
      position:"absolute"   
    },
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: `url("${image}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
    },
    button: {
      width: "100%",
      height: "3.9rem",
      cursor: "pointer",
      backgroundColor: PRIMARY,
      color: WHITE,
      fontSize: "2rem",
      border: 0,
      marginTop: "3rem",
    },
    text: {
      fontSize: "2rem",
      display: "block",
    },
    typography: {
      fontWeight: "bold",
      fontSize: "1rem",
      display: "block",
      color: PRIMARY,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    loginText: {
      fontWeight: "bold",
      fontSize: "1rem",
      color: PRIMARY,
    },
    logo: {
      margin: theme.spacing(0, -4),
    },
    character: {
      fontWeight: "bold",
    },
}));  
export default function FormDialog() {
  const dispatch=useDispatch();
  const {id}=useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] =useState(0);
  const classes = useStyles();
  const[rating,setRating]=useState(0);
  const[comment,setComment]=useState("");
  const[username,setUsername]=useState("");

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
      username: "",
      
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Required field"),
      comment: Yup.string().required("Required field"),
      username: Yup.string().required("Required field"),
    }),
    
    onSubmit: async ({
      rating,
      username,
      comment,      
    }) => {
            
      try {
        dispatch(addReview(rating,comment,username,id));
      setOpen(false);
      } catch (error) {
       
       
      }
    },
  });
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleCloseSubmit = () => {
      dispatch(addReview(rating,comment,username,id));
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add reviews
      </Button>
      
      <Dialog open={open} onClose={handleClose} >
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5} className={classes.image} />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Grid className={classes.logo}>
            <img src={logo.default} alt="Logo" />
          </Grid>
          <Typography align="left" className={classes.text} gutterBottom>
            Add Reviews
          </Typography>

          <form
            onSubmit={formik.handleSubmit}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={2}>
              
                <Typography className={classes.typography} gutterBottom>
                  User name
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="username"
                  placeholder="Enter your user name"
                  name="username"                  
                  fullWidth
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                
              
                <Typography className={classes.typography} gutterBottom>
                  Comment
                </Typography>
                <InputTextBox
                  variant="outlined"
                  id="comment"
                  placeholder="Enter a comment"
                  name="comment"                  
                  fullWidth
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.comment && Boolean(formik.errors.comment)
                  }
                  helperText={formik.touched.comment && formik.errors.comment}
                />
                   
                <Typography className={classes.typography} gutterBottom>
                  Rating
                </Typography>
                
                <Rating
                  required
                  value={formik.values.rating}
                  name="rating"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rating && Boolean(formik.errors.rating)
                  }
                  helperText={
                    formik.touched.rating && formik.errors.rating
                  }
                />
                      
             
            </Grid>
            <button type="submit" className={classes.button}>
              Add
              
            </button>
            <Box mt={2}></Box>            
          </form>
        </div>
      </Grid>
    </Grid>
      </Dialog>
      
    </div>
  );
}