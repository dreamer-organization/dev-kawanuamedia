import React from "react";
import { createRoot } from "react-dom/client";
import {
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import QueryProvider from "./context/query-provider";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import NotFound from "./pages/not-found";
import { GlobalLoader } from "./pages/global-loader";

const router = createRouter({
  routeTree,

  context: {
    authentication:
      undefined!,
  },

  defaultNotFoundComponent:
    () => <NotFound />,

  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider
        router={router}
        defaultPendingComponent={
          GlobalLoader
        }
      />
    </QueryProvider>
  </React.StrictMode>
);