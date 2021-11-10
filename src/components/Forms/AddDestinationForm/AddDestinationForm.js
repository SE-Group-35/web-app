import * as Yup from "yup";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";

// material
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  Card,
  CardContent,
  Box,
  Grid,
  Paper,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";

import { LoadingButton } from "@material-ui/lab";
import PlacesAutocomplete from "react-places-autocomplete";
import AddIcon from "@iconify/icons-eva/plus-outline";
import RemoveIcon from "@iconify/icons-eva/minus-outline";

import ImageElement from "../../ImageElement";
import ImagesDropzone from "../../ImagesDropzone";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import {
  addDestination,
  editDestination,
} from "../../../store/entities/destinations";

// ----------------------------------------------------------------------

const tag_options = ["Historical", "Religious", "Natural"]; //options for categories

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  indeterminateColor: {
    color: "#00CEC9",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    places: {
      width: 40,
      height: 200,
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export default function AddDestinationForm({
  id,
  title,
  description,
  Selected,
  Address,
  url,
  published,
  overview,
  name,
  Coords,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(Address);
  const [coords, setCoords] = useState({
    lat: parseFloat(Coords.at(0)),
    lng: parseFloat(Coords.at(1)),
  });
  const [selected, setSelected] = useState(Selected);

  const [switchState, setSwitchState] = useState(published);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), activityName: "", activityDescription: "" },
  ]);

  const [imageList, setImageList] = useState([]);

  const handleChangeOrderUp = (index) => {
    // If first, ignore
    if (index !== 0) {
      const newArray = [...imageList];
      const intermediate = newArray[index - 1];
      newArray[index - 1] = newArray[index];
      newArray[index] = intermediate;
      setImageList(newArray);
    }
  };

  const handleChangeOrderDown = (index) => {
    // If last, ignore
    if (index < imageList.length - 1) {
      const newArray = [...imageList];
      const intermediate = newArray[index + 1];
      newArray[index + 1] = newArray[index];
      newArray[index] = intermediate;
      setImageList(newArray);
    }
  };

  const handleDeleteImage = (index) => {
    const newArray = [...imageList];
    newArray.splice(index, 1);
    setImageList(newArray);
  };

  const handleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoords(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

  const handleChangeInput = (id, event) => {
    //activity
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);    
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), activityName: "", activityDescription: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  const classes = useStyles();

  const isAllSelected =
    tag_options.length > 0 && selected.length === tag_options.length;

  const handleChange = (event) => {
    //categories
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === tag_options.length ? [] : tag_options);
      return;
    }
    setSelected(value);
  };

  const DestinationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("Title is required"),
    description: Yup.string()
      .min(20, "Too Short!")
      .max(300, "Too Long!")
      .required("Description is required"),
    overview: Yup.string()
      .min(20, "Too Short!")
      .max(2000, "Too Long!")
      .required("Overview is required"),
  });
  const formik = useFormik({
    initialValues: {
      title,
      description,
      overview,
    },
    validationSchema: DestinationSchema,
    onSubmit: async ({ title, description, overview }) => {
      if (name === "Add") {
        await dispatch(
          addDestination(
            title,
            description,
            address,
            overview,
            inputFields,
            selected,
            coords,
            imageList,
            switchState
          )
        );
      } else if (name === "Edit") {
        await dispatch(
          editDestination(
            id,
            title,
            description,
            overview,
            selected,
            address,
            coords,
            switchState
          )
        );
      }
      navigate("/dashboard/destination", { replace: true });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;

  const searchOptions = {
    componentRestrictions: { country: ["lk"] },
  };

  return (
    <Card>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {name === "Edit" ? (
                <>
                  <Paper variant="outlined">
                    <img src={url} />
                  </Paper>

                  <LoadingButton fullWidth size="medium">
                    Edit Images
                  </LoadingButton>
                  <LoadingButton fullWidth size="medium">
                    Edit Activities
                  </LoadingButton>
                </>
              ) : null}

              <TextField
                fullWidth
                label="Title"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />

              <TextField
                fullWidth
                label="Description"
                {...getFieldProps("description")}
                multiline
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
              <TextField
                fullWidth
                label="Overview"
                {...getFieldProps("overview")}
                multiline
                error={Boolean(touched.overview && errors.overview)}
                helperText={touched.overview && errors.overview}
              />

              <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-select-label">Categories</InputLabel>
                <Select
                  label="Event Date"
                  labelId="mutiple-select-label"
                  inputlabelprops={{
                    shrink: true,
                  }}
                  multiple
                  value={selected}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  <MenuItem
                    value="all"
                    classes={{
                      root: isAllSelected ? classes.selectedAll : "",
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        classes={{ indeterminate: classes.indeterminateColor }}
                        checked={isAllSelected}
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < tag_options.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.selectAllText }}
                      primary="Select All"
                    />
                  </MenuItem>
                  {tag_options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <PlacesAutocomplete
                value={address}
                onChange={(newAddress) => {
                  setAddress(newAddress);
                }}
                onSelect={handleSelect}
                searchOptions={searchOptions}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <TextField
                      fullWidth
                      {...getInputProps({
                        placeholder: "Select Address ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            key={suggestion.description}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {name != "Edit" ? (
                <Typography
                  variant="h6"
                  sx={{ mt: 3, mb: 3, textAlign: "left" }}
                >
                  Add Activities
                </Typography>
              ) : null}

              {name != "Edit"
                ? inputFields.map((inputField) => (
                    <div key={inputField.id}>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          name="activityName"
                          label="Activity Name"
                          value={inputField.activityName}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        />
                        <TextField
                          name="activityDescription"
                          label="Activity Description"
                          multiline
                          value={inputField.activityDescription}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        />
                        <IconButton
                          disabled={inputFields.length === 1}
                          onClick={() => handleRemoveFields(inputField.id)}
                        >
                          <Icon icon={RemoveIcon} width={20} height={20} />
                        </IconButton>
                        <IconButton onClick={handleAddFields}>
                          <Icon icon={AddIcon} width={20} height={20} />
                        </IconButton>
                      </Stack>
                    </div>
                  ))
                : null}

              {name != "Edit" ? (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={2}
                >
                  <Box border={1} margin={4} padding={3}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                      spacing={1}
                    >
                      <Grid item container xs={12} justify="center">
                        <ImagesDropzone setImageList={setImageList} id={id} />
                      </Grid>
                    </Grid>
                  </Box>
                  {imageList.length > 0 && (
                    <Box bgcolor="primary.light" p={4}>
                      {imageList.map((image, index) => {
                        return (
                          <Grid mb={5} item key={image.file.size + index}>
                            <ImageElement
                              image={image}
                              index={index}
                              isFirstElement={index === 0}
                              isLastElement={index === imageList.length - 1}
                              handleChangeOrderUp={handleChangeOrderUp}
                              handleChangeOrderDown={handleChangeOrderDown}
                              handleDeleteImage={handleDeleteImage}
                            />
                          </Grid>
                        );
                      })}
                    </Box>
                  )}
                </Grid>
              ) : null}

              <Typography variant="h6" sx={{ mt: 3, mb: 3, textAlign: "left" }}>
                Publish
              </Typography>
              <Switch
                checked={switchState}
                onChange={handleSwitchChange}
                name="Publish"
              />
              <Typography
                variant="subitle2"
                sx={{ mt: 3, mb: 3, textAlign: "left" }}
              >
                Disabling this will automatically make the destination
                unpublished
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
