import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { GlobalLoader } from "./pages/global-loader";

export default function App() {
  return (
    <RouterProvider
      router={router}
      defaultPendingComponent={GlobalLoader}
    />
  )
}