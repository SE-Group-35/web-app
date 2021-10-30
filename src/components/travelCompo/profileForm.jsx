import * as Yup from "yup";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Card, CardContent,} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { editUser } from "../../store/entities/users";
import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";


const useStyles = makeStyles({
  button: {
    width: "100%",
    height: "3.0rem",
    cursor: "pointer",
    backgroundColor: "#00CEC9",
    borderRadius: 20,
    color: "#FFF",
    fontSize: "1.5rem",
    border: 0,
    
  },
});

ProfileForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string,
  Enabled: PropTypes.bool,
};

const role = { admin: false, traveller: false };

export default function ProfileForm({
  id,
  firstName,
  lastName,
  email,
  telephone,
  userRole,
  title,
  Enabled,
}) {
 

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),

    telephone: Yup.string()
      .required("Telephone Number is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10)
      .required("A phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      telephone,
      admin: userRole.admin,
      Enabled,
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({
      firstName,
      lastName,
      email,
      telephone,
      admin,
      Enabled,
    }) => {
      admin == true
        ? (userRole = { ...role, admin: true })
        : (userRole = { ...role, traveller: true });
       if (title === "Edit") {
        await dispatch(
          editUser(
            email,
            id,
            telephone,
            firstName,
            lastName,
            userRole
          )
        );
        navigate("/traveller/profile");
        alert("Success!");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleClick = () => {
    navigate("/traveller/profile");
  };

  return (
    <Card>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps("firstName")}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps("lastName")}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Stack>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Telephone Number"
                {...getFieldProps("telephone")}
                error={Boolean(touched.telephone && errors.telephone)}
                helperText={touched.telephone && errors.telephone}
              />  
              <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} md={5}>         
                <button type="submit" className={classes.button}>
                Edit                
              </button>
              </Grid>
              <Grid item xs={12} md={5}>         
                <button type="submit" className={classes.button} onClick={handleClick}>
                Cancel                
              </button>
              </Grid>
              </Grid> 
            </Stack>
          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}
