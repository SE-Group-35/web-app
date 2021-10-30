import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import image from "../../assets/images/activities.png";
import { useState ,useEffect } from "react";
import { PRIMARY, WHITE } from "../../colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAuth } from "../../store/auth";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getProfile } from "../../store/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { database } from "../../firebase";
import { useParams } from "react-router";
import ProfileForm from './profileForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';  
const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles((theme) => ({
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
    height: "3rem",
    cursor: "pointer",
    backgroundColor: PRIMARY,
    color: WHITE,
    fontSize: "1.5rem",
    border: 0,
    marginTop: "3rem",
    '&:hover': {
        backgroundColor: PRIMARY,
        color: WHITE,
    },
  },
  text: {
    fontSize: "1.5rem",
    display: "block",
    margin : theme.spacing(1,2)  
  },
  textHeading: {
    fontSize: "2rem",
    display: "block",
    margin : theme.spacing(-5,15),
    padding : "2%",
    fontWeight:"bold"  
  },
  emailText:{
    margin : theme.spacing(0,2)
  },
  typography: {
    fontWeight: "bold",
    fontSize: "1rem",
    display: "block",
    color: PRIMARY,
  },
  form: {
    width: "100%",
    margin: theme.spacing(7,0),
  },
  loginText: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: PRIMARY,
  },
  logo: {
    margin: theme.spacing(15, 0),
  },
  character: {
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    width:"80%" ,
    margin : theme.spacing(-5,5)   
  },
  avatar : {
      margin : theme.spacing(0,5),
      width : "10vw",
      height : "20vh"
  },
  space :{
      margin:theme.spacing(10,0)
  },
  styledText:{
    
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:WHITE, 
      
  }, 
  appbar :{   
      width : "25vw",
      marginRight: "75%"
      
  }
}));

const EditProfile = () => {
  const classes = useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { firstName, lastName, email, telephone } = useSelector(getProfile);
  const { uid } = useSelector(getAuth);
  const { id } = useParams();
  const [USER, setUSER] = useState({});
  useEffect(() => {
    async function fetchUser() {
      await database
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());

          setUSER(snapshot.data());
        });
    }
    fetchUser();
  }, [database]);

  if (JSON.stringify(USER) === "{}") {
    return <CircularProgress />;
  } else {
    const { firstName, lastName, email, telephone, Enabled, userRole } = USER;
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={3}  >
        <AppBar className={classes.appbar} >
            <Toolbar >
              <Link href={`/traveller/${uid}`}>
                <Typography className={classes.styledText}>
                    Home
                </Typography>
                </Link>
            </Toolbar>
        </AppBar>
        <img src={logo.default} alt="Logo"className={classes.logo} />
        <Card className={classes.card}>
          <div >
            <CardContent>
            <Avatar className={classes.avatar} />
              <Typography  variant="h5" className={classes.text}>
                {firstName+"  "}{lastName}
              </Typography>
              <Typography variant="subtitle1" paragraph className={classes.emailText}>
                {email}
              </Typography>              
            </CardContent>
          </div>          
        </Card>                  
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>            
          <Typography align="left" gutterBottom className={classes.textHeading}>
            My Profile 
          </Typography>
          <Container className={classes.space}>
                <ProfileForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  telephone={telephone}
                  userRole={userRole}
                  Enabled={Enabled}
                  title="Edit"
                  id={id}
                />
            </Container>
         </div>
      </Grid>
      <Grid item xs={12} sm={8} md={3} component={Paper}  className={classes.image}></Grid>
    </Grid>
  );
  }
};

export default EditProfile;