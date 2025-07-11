import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { userPaths } from "./userRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(userPaths),
  },
  // {
  //   path: "/auth/change-password",
  //   element: <ChangePassword />,
  // },
]);
