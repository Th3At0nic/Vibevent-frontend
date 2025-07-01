import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { userPaths } from "./userRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(userPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
