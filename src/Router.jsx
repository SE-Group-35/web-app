import React, { useEffect } from "react";

import { Navigate, useRoutes } from "react-router-dom";

import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import RegisterUser from "./screens/admin/AddUser";
import EditUser from "./screens/admin/EditUser";

import DashboardApp from "./screens/admin/DashboardApp";
import DashboardLayout from "./layouts/dashboard";
import User from "./screens/admin/User";
import Event from "./screens/admin/Event";
import AddEvent from "./screens/admin/AddEvent";
import AddDestination from "./screens/admin/AddDestination";
import EditEvent from "./screens/admin/EditEvent";
import EditDestination from "./screens/admin/EditDestination";

import Destination from "./screens/admin/Destination";
import UserServices from "./screens/userServices";
import EventTraveller from "./screens/event";
import Category from "./screens/category";
import Page404 from "./screens/admin/Page404";
import Profile from "./screens/admin/Profile";

//import { getAuth } from "./store/auth";
//import { useSelector } from "react-redux";

import Traveller from "./screens/traveller";
import AutomatedPlanner from "./screens/tripPanner/automated";
import CustomizedPlanner from "./screens/tripPanner/cutomized";
import MyTrips from "./screens/myTrips";
import SpecificDestination from "./screens/destination";
import { auth } from "./firebase";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { getCurrentRole, getActiveStatus } from "./store/auth";
import TravellerProfile from "./components/travelCompo/profile";
import EditProfile from "./components/travelCompo/editProfile";
import TravelPlan from "./screens/tripSequence/index";
import TripDisplay from "./components/trip/displayTrip";
import PageUnAuthorized from "./screens/admin/PageUnAuthorized";

export default function Router() {
  const currentRole = useSelector(getCurrentRole);
  const status = useSelector(getActiveStatus);

  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/services", element: <UserServices /> },
    { path: "/unauthorized", element: <PageUnAuthorized /> },

    { path: "/event/:id", element: <EventTraveller /> },
    { path: "/category/:id", element: <Category /> },
    { path: "/destination/:id", element: <SpecificDestination /> },
    {
      path: "/traveller/:id",
      element:
        currentRole === "Traveller" ? <Traveller /> : <Navigate to="/" />,
    },
    {
      path: "/traveller/destination/:id",
      element:
        currentRole === "Traveller" ? (
          <SpecificDestination />
        ) : (
          <Navigate to="/" />
        ),
    },
    { path: "/category/destination/:id", element: <SpecificDestination /> },
    {
      path: "/traveller/automatedPlanner",
      element:
        currentRole === "Traveller" ? (
          <AutomatedPlanner />
        ) : (
          <Navigate to="/" />
        ),
    },
    {
      path: "/traveller/customizedPlanner",
      element:
        currentRole === "Traveller" ? (
          <CustomizedPlanner />
        ) : (
          <Navigate to="/" />
        ),
    },
    {
      path: "/traveller/myTrips/:id",
      element: currentRole === "Traveller" ? <MyTrips /> : <Navigate to="/" />,
    },

    {
      path: "/traveller/myTrips/:id/:id",
      element:
        currentRole === "Traveller" ? <TripDisplay /> : <Navigate to="/" />,
    },
    {
      path: "/traveller/profile",
      element:
        currentRole === "Traveller" ? (
          <TravellerProfile />
        ) : (
          <Navigate to="/" />
        ),
    },
    {
      path: "/traveller/travelPlan",
      element:
        currentRole === "Traveller" ? <TravelPlan /> : <Navigate to="/" />,
    },
    {
      path: "/traveller/editProfile/:id",
      element:
        currentRole === "Traveller" ? <EditProfile /> : <Navigate to="/" />,
    },
    { path: "404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
    {
      path: "/dashboard",
      element:
        currentRole === "Admin" && status === true ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "addUser", element: <RegisterUser /> },
        { path: "editUser/:id", element: <EditUser /> },
        { path: "editEvent/:id", element: <EditEvent /> },
        { path: "editDestination/:id", element: <EditDestination /> },
        { path: "addDestination", element: <AddDestination /> },
        { path: "addEvent", element: <AddEvent /> },

        { path: "profile", element: <Profile /> },

        { path: "destination", element: <Destination /> },
        { path: "event", element: <Event /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
