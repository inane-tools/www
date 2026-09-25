import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("apps/:slug", "routes/app.tsx"),
] satisfies RouteConfig
