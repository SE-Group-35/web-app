import * as Yup from "yup";

import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import { useFormik, Form, FormikProvider } from "formik";

import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  Typography,
  Switch,
  Card,
  CardContent,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { createUser, editUser } from "../../store/entities/users";
import { getCreateUserStatus } from "../../store/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------
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
    marginTop: "3rem",
  },
});

RegisterForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string,
  Enabled: PropTypes.bool,
};

const role = { admin: false, traveller: false };

export default function RegisterForm({
  id,
  firstName,
  lastName,
  email,
  telephone,
  userRole,
  title,
  Enabled,
}) {
  const creatingUser = useSelector(getCreateUserStatus);

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
      const password = "YourPassword@123";
      if (title === "Add") {
        await dispatch(
          createUser(
            email,
            password,
            telephone,
            firstName,
            lastName,
            userRole,
            Enabled
          )
        );
      } else if (title === "Edit") {
        await dispatch(
          editUser(
            id,

            telephone,
            firstName,
            lastName,
            userRole
          )
        );
      }
      navigate("/dashboard/user");
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
                disabled={title === "Edit" ? true : false}
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
              {userRole.admin == false ? (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mt: 3, mb: 3, textAlign: "left" }}
                  >
                    Make Admin
                  </Typography>
                  <Switch
                    checked={values.admin}
                    onChange={(event, checked) => {
                      setFieldValue("admin", checked ? true : false);
                    }}
                    name="admin"
                    value={values.admin}
                  />
                  <Typography
                    variant="subitle2"
                    sx={{ mt: 3, mb: 3, textAlign: "left" }}
                  >
                    Disabling this will automatically make the user a traveller
                  </Typography>
                </>
              ) : null}

              <button type="submit" className={classes.button}>
                {creatingUser ? <Spinner /> : title}
              </button>
            </Stack>
          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}
