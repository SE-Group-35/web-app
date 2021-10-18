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

const useStyles = makeStyles((theme) => ({
    dialogStyle: {
      padding:theme.spacing(2),
      position:"absolute"   
    }
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
        <Typography>Add reviews</Typography>
      <Box align="left"  component="fieldset" mb={3} borderColor="transparent">
        <Rating
          required
          value={rating}
          name="rating"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          error={
            formik.touched.rating && Boolean(formik.errors.rating)
          }
          helperText={
            formik.touched.rating && formik.errors.rating
          }
        />
      </Box>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="comment"
            fullWidth                       
            variant="outlined"
            onChange={(event)=>setComment(event.target.value)}
            error={
              formik.touched.comment && Boolean(formik.errors.comment)
            }
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
            variant="outlined"
            onChange={(event)=>setUsername(event.target.value)}
            error={
              formik.touched.username && Boolean(formik.errors.username)
            }
            helperText={
              formik.touched.username && formik.errors.username
            }
          />
        <Grid>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseSubmit}>Submit</Button>
        </Grid>
      </Dialog>
      
    </div>
  );
}