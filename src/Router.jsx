import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";

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
import Page404 from "./screens/admin/Page404";
import { auth } from "./firebase";
import { userLoggedIn, userLoggedOut } from "./store/auth";

export default function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) dispatch(userLoggedIn(user));
      else dispatch(userLoggedOut());
    });
  });

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
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "destination", element: <Destination /> },
        { path: "event", element: <Event /> },
      ],
    },
  ]);
}
