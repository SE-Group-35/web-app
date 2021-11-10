import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../firebase";
import GreenCheckbox from "../../components/common/GreenCheckBox";
import InputTextBox from "../../components/common/InputTextBox";
import Spinner from "../../components/common/Spinner";
import { BLACK, DARKGREY, GREY, PRIMARY, WHITE } from "../../colors";
import { signIn, signOut } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAuth } from "../../store/auth";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import { getUserRole } from "../../utils/getUserRole";
import { setRole } from "../../store/auth";
import CircleLoading from "../../components/sequence/loading";


const image = require("../../assets/images/login.jpg");
const logo = require("../../assets/images/logo.svg");

const useStyles = makeStyles({
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
  forgotPasswordText: {
    color: PRIMARY,
    marginTop: "0.5rem",
  },
  form: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "90%",
  },
  formGroup: {
    marginTop: "2rem",
  },
  formInput: {
    backgroundColor: GREY,
  },
  FormLabel: {
    color: PRIMARY,
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  grid: {
    height: "100vh",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loginBox: {
    paddingTop: "2.5rem",
    paddingBottom: "1rem",
  },
  loginTitle: {
    fontWeight: "bold",
    fontSize: "2rem",
    display: "block",
    marginBottom: "3rem",
  },
  logoContainer: {
    width: "98%",
  },

  registerText: {
    color: PRIMARY,
  },
  rememberMeText: {
    color: DARKGREY,
  },
  rowContainer: {
    marginTop: "1rem",
    fontWeight: "500",
    color: BLACK,
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [logginIn, setLogginIn] = useState(false);
  const { uid } = useSelector(getAuth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required field"),
      password: Yup.string()
        .min(6, "Password must contain more than 6 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          "Password must contain minimum six characters, at least one letter, one number and one special character"
        )
        .required("Required field"),
    }),
    onSubmit: async ({ email, password }) => {
      console.log("email", email);
      console.log("password", password);
      try {
        
        //await auth.signInWithEmailAndPassword(email, password);

        dispatch(signIn(email, password));
        auth.onAuthStateChanged(async (user) => {
          console.log(user);
          if (user) {
            const userId = user.uid;
            setLogginIn(true);
            await database
              .collection("users")
              .doc(userId)
              .get()
              .then((snapshot) => {
                const role = getUserRole(snapshot.data().userRole);
                if (role === "Admin") {
                  dispatch(setRole("Admin"));
                  navigate("/dashboard/app");
                } else if (role === "Traveller") {
                  dispatch(setRole("Traveller"));
                  navigate(`/traveller/${userId}`);
                }
              });
          } else {
            dispatch(setRole(""));
            navigate("/login");
          }
        });

        //setLogginIn(false);
      } catch (error) {
        setLogginIn(false);
        console.log(error);
      }
    },
  });
  return (
    <Grid container>
      <Grid item xs={12} md={8} className={classes.grid}>
        <img src={image.default} className={classes.image} alt="Seegiriya" />
      </Grid>
      <Grid item xs={12} md={4} className={classes.loginBox}>
        {" "}
        <Grid
          container
          className={classes.logoContainer}
          justifyContent="center"
          alignItems="flex-start"
        >
          <img src={logo.default} alt="Logo" />
        </Grid>
        <Grid className={classes.form}>
          <span className={classes.loginTitle}>Login</span>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup className={classes.formGroup}>
              <FormControl>
                <FormLabel className={classes.FormLabel}>Email</FormLabel>
                <InputTextBox
                  id="email"
                  type="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  placeholder="Enter Your Email..."
                />
              </FormControl>
            </FormGroup>
            <FormGroup className={classes.formGroup}>
              <FormControl>
                <FormLabel className={classes.FormLabel}>Password</FormLabel>
                <InputTextBox
                  id="password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  placeholder="Enter Your Password..."
                />
              </FormControl>
            </FormGroup>
            <Grid
              container
              justifyContent="space-between"
              className={classes.rowContainer}
            >
              <Grid className={classes.rememberMeText}>
                <FormControlLabel
                  control={<GreenCheckbox />}
                  label="Remember Me"
                />
              </Grid>
              <Grid>
                <Link
                  to="/forgot-password"
                  className={classes.forgotPasswordText}
                >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>
            {/* {logginIn ?<div><button type="submit" className={classes.button}>Login</button>
            <CircleLoading/>
            </div> :<button type="submit" className={classes.button}>Login</button>} */}
            {logginIn?
            <Grid>
                 <button type="submit" className={classes.button}>Login...</button>
                 <CircleLoading/>
               </Grid>
              : <button type="submit" className={classes.button}>Login</button>}
          </form>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.rowContainer}
          >
            <Grid>Don't have an account?</Grid>
            <Grid>
              <Link to="/register" className={classes.registerText}>
                Register
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
