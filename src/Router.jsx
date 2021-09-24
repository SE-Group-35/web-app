import React, { useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import RegisterUser from "./screens/admin/Register";
import DashboardApp from "./screens/admin/DashboardApp";
import DashboardLayout from "./layouts/dashboard";
import User from "./screens/admin/User";
import Event from "./screens/admin/Event";
import Products from "./screens/admin/Products";
import Blog from "./screens/admin/Blog";
import Destination from "./screens/admin/Destination";
import UserServices from "./screens/userServices";
import EventTraveller from "./screens/event";
import Category from "./screens/category";
import Page404 from "./screens/admin/Page404";
import Traveller from "./screens/traveller";
import AutomatedPlanner from "./screens/tripPanner/automated";
import CustomizedPlanner from "./screens/tripPanner/cutomized";
// import { auth } from "./firebase";

export default function Router() {
  /*const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
      else navigate("/login");
    });
<<<<<<< HEAD
  });*/

  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/services", element: <UserServices /> },
    { path: "/event", element: <EventTraveller /> },
    { path: "/category", element: <Category /> },
    { path: "/traveller", element: <Traveller /> },
    { path: "/traveller/automatedPlanner", element: <AutomatedPlanner /> },
    { path: "/traveller/customizedPlanner", element: <CustomizedPlanner /> },
   
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
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "destination", element: <Destination /> },
        { path: "event", element: <Event /> },
      ],
    },
    
  ]);
}
