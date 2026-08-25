import "@tanstack/react-router";

import type {
  RouteStaticData,
} from "./router";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption
    extends RouteStaticData {}
}