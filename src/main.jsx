import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import * as Page from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page.HomePage />,
  },
  {
    path: "/profile",
    element: <Page.Profile />,
  },
  {
    path: "/property",
    element: <Page.ListPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
