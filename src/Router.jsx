import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { useDispatch } from "react-redux";
import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import DashboardApp from "./screens/admin/DashboardApp";
import DashboardLayout from "./layouts/dashboard";
import User from "./screens/admin/User";
import Products from "./screens/admin/Products";
import Blog from "./screens/admin/Blog";
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
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
      ],
    },
  ]);
}
