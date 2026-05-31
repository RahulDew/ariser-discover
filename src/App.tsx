import React from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root";
import { indexRoute } from "./routes/index";
import { searchRoute } from "./routes/search";
import { helpRoute } from "./routes/help";

// Load global and modern styling
import "./styles/global.css";
import "./styles/fonts.css";

// Programmatically build route tree
const routeTree = rootRoute.addChildren([indexRoute, searchRoute, helpRoute]);

// Initialize the router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent", // Preload search content on hover/intent
});

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
