import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import App from "./App.tsx";
import Spectrum from "./Spectrum.tsx";
import ReactGridLayout from "./ReactGridLayout.tsx";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/spectrum",
    element: <Spectrum />,
  },
  {
    path: "/grid-layout",
    element: <ReactGridLayout />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider theme={defaultTheme}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
