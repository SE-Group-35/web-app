import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import image from "../../assets/images/UserServices/service.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PRIMARY } from "../../colors";
import ImageCard from "./../../components/home/Card";
import Cover from "./../../components/userServices/cover";

const image1 = require("../../assets/images/UserServices/travelPlan.jpg");
const image2 = require("../../assets/images/UserServices/destination.jpg");
const image3 = require("../../assets/images/UserServices/event.jpg");
const image4 = require("../../assets/images/UserServices/nearby.png");
const image5 = require("../../assets/images/UserServices/manageTrip.png");
const image6 = require("../../assets/images/UserServices/rating.png");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },

  card: {
    margin: theme.spacing(-5, 0),
  },
  justify: {
    justifyContent: "center",
    margin: theme.spacing(3, 45),
  },
  styledText: {
    margin: theme.spacing(6, 0),
    justifyContent: "left",
    color: PRIMARY,
    fontSize: "1.3rem",
    fontStyle: "italic",
    fontWeight: "bold",
  },
}));

const mainFeaturedPost = {
  title: "Our Services",
  description:
    "Hi! Would you explore nature paradise in the world. Let's find the best trip in Sri Lanka.Join with us!.",
  image: `${image}`,
  imgText: "main image description",
};

const newCard = [
  {
    title: "Generate the best travel plan",
    description:
      "Use our trip planner to get a personalized day by day itinerary for your vacation.Application provides two ways of generating travel plans. You can experience both the customized travel plan and the automated travel plan. It is a complete day by day itinerary based on your preferences. We'll suggest the best plan and schedules.",
    image: `${image1.default}`,
    imageText: "",
    imageLink: "",
  },
  {
    title: "Provide destination details",
    description:
      "You can get detailed descriptions about specific travel destinations which are categorized under religious, historical and natural. There we provide an overview of the place, weather conditions, activities that can be done, some useful picture collection. Significantly, you can get details about seasonal events. ",
    image: `${image2.default}`,
    imageText: "",
    imageLink: "",
  },
  {
    title: "Provide event details",
    description:
      "You can get detailed descriptions about upcoming events as Sri Lanka has a wide variety of cultural events such as Sinhala and Tamil New Year, Veasak event, Kandy Esala Perahara, Christmas celebrations, Independence event and more.   ",
    image: `${image3.default}`,
    imageText: "",
    imageLink: "",
  },
  {
    title: "Suggest nearby destinations",
    description:
      " Our application shows nearby places places like museums, new restaurants, and popular bars and clubs according to your current location. We will provide a detailed description of that places including activities that can be done, weather conditions and more things.  ",
    image: `${image4.default}`,
    imageText: "",
    imageLink: "",
  },
  {
    title: "Manage trips",
    description:
      "Your past trips, ongoing trips and future trips are manageble where you can view overall descriptions about your trips, edit your trips, cancel your trips and such. You can experience the notification system where you get remiders about your trips.We'll provide more facilities here where you can  make your trip planning easy. ",
    image: `${image5.default}`,
    imageText: "",
    imageLink: "",
  },
  {
    title: "Provide recommendations and ratings",
    description:
      "We suggest best places to you to visit. And you have the ability to add recommendations. You will experience the details of trending places as well. From that mainly you can find better places and activities and it will guide you for an interesting and fantastic trip. We highly appreciate and trust your opinions which help us to provide an effective application as well.",
    image: `${image6.default}`,
    imageText: "",
    imageLink: "",
  },
];

const UserServices = (props) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.image}>
        <Cover post={mainFeaturedPost} />
        <div className={classes.paper}>
          <Grid container spacing={4} className={classes.card}>
            {newCard.map((post) => (
              <ImageCard key={post.title} post={post} />
            ))}
          </Grid>
          <Grid className={classes.justify}>
            <Typography className={classes.styledText}>
              Join with us. You can Experience more services...
            </Typography>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserServices;
