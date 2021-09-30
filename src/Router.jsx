import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  useRoutes,
  useNavigate,
} from "react-router-dom";

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
import Page404 from "./screens/admin/Page404";
import { auth } from "./firebase";
import Profile from "./screens/admin/Profile";
//import { getAuth } from "./store/auth";
//import { useSelector } from "react-redux";

export default function Router() {
  /*const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
      else navigate("/login");
    });
  });*/

  //const isAdmin = profile ? false : profile.userRole.admin;
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
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
