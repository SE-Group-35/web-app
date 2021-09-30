import { useState, useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { useFormik, Form, FormikProvider } from "formik";
import { addEvent, editEvent } from "../../store/entities/events";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  Typography,
  Switch,
  Input,
  Card,
  CardContent,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import Image from "material-ui-image";
const moment = require("moment");

// ----------------------------------------------------------------------
AddEventForm.propTypes = {
  title: PropTypes.string,
  venue: PropTypes.string,
  date: PropTypes.object,
  description: PropTypes.string,
  name: PropTypes.string,
  published: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
};

export default function AddEventForm({
  title,
  venue,
  date,
  description,
  name,
  published,
  url,
  id,
  overview,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [switchState, setSwitchState] = useState(published);
  const [Uri, setUri] = useState(url);
  //useEffect(() => console.log(switchState), [switchState]);

  const handleChange = (event) => {
    setSwitchState(event.target.checked);
  };
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const EventSchema = Yup.object().shape({
    name: Yup.string(),
    title: Yup.string()
      .min(2, "Title is too Short!")
      .max(50, "Too Long!")
      .required("Title is required"),
    description: Yup.string()
      .min(20, "Too Short!")
      .max(5000, "Too Long!")
      .required("Description is required"),
    venue: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("Venue is required"),
    startDate: Yup.date().when("name", {
      is: "Add",
      then: Yup.date()
        .required("Start Date is required ")
        .min(new Date(), "Start Date must be larger than today"),
    }),

    endDate: Yup.date().min(
      Yup.ref("startDate"),
      "End date can't be before the Start date"
    ),

    file: Yup.mixed().when("name", {
      is: "Add",
      then: Yup.mixed()
        .required("An image is required")
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    }),
    /*
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      ) */
  });
  moment(date).format("YYYY-MM-DDTkk:mm");
  const formik = useFormik({
    initialValues: {
      name,
      title,
      venue,
      startDate:
        date.from === ""
          ? ""
          : moment(new Date(date.from.seconds * 1000)).format(
              "YYYY-MM-DDTkk:mm"
            ),
      endDate:
        date.to === ""
          ? ""
          : moment(new Date(date.to.seconds * 1000)).format("YYYY-MM-DDTkk:mm"),
      description,
      file: "",
      overview,
    },
    validationSchema: EventSchema,
    onSubmit: async ({
      title,
      overview,
      description,
      startDate,
      endDate,
      file,
      venue,
    }) => {
      if (name === "Add") {
        await dispatch(
          addEvent(
            file,
            title,
            description,
            published,
            startDate,
            endDate,
            venue,
            Uri,
            overview
          )
        );
        navigate("/dashboard/event", { replace: true });
      } else if (name == "Edit") {
        await dispatch(
          editEvent(
            id,
            file,
            title,
            description,
            published,
            startDate,
            endDate,
            venue,
            Uri,
            overview
          )
        );

        navigate("/dashboard/event", { replace: true });
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

  return (
    <Card>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Title"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                fullWidth
                label="Venue"
                {...getFieldProps("venue")}
                error={Boolean(touched.venue && errors.venue)}
                helperText={touched.venue && errors.venue}
              />
              <TextField
                label="From"
                InputLabelProps={{
                  shrink: true,
                }}
                type="datetime-local"
                fullWidth
                {...getFieldProps("startDate")}
                error={Boolean(touched.startDate && errors.startDate)}
                helperText={touched.startDate && errors.startDate}
              />
              <TextField
                label="To"
                InputLabelProps={{
                  shrink: true,
                }}
                type="datetime-local"
                fullWidth
                {...getFieldProps("endDate")}
                error={Boolean(touched.endDate && errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />

              <Input
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.target.files[0]);
                  setUri("");
                }}
                error={Boolean(touched.file && errors.file)}
                helperText={touched.file && errors.file}
              />
              {values.file != "" ? (
                <Image
                  imageStyle={{ height: 250, mb: 0, pb: 0 }}
                  src={URL.createObjectURL(values.file)}
                />
              ) : null}
              {Uri != "" ? (
                <Image imageStyle={{ height: 250, mb: 0, pb: 0 }} src={Uri} />
              ) : null}
              <TextField
                fullWidth
                label="Description"
                multiline
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                fullWidth
                label="Overview"
                multiline
                {...getFieldProps("overview")}
                error={Boolean(touched.overview && errors.overview)}
                helperText={touched.overview && errors.overview}
              />

              <Typography variant="h6" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
                Publish
              </Typography>
              <Switch
                checked={switchState}
                onChange={handleChange}
                name="Publish"
              />
              <Typography
                variant="subitle2"
                sx={{ mt: 3, mb: 3, textAlign: "left" }}
              >
                Disabling this will automatically make the event unpublished
              </Typography>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {name}
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}
