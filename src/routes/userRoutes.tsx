import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddEvent from "../pages/user/AddEvent";
import Events from "../pages/user/Events";
import Home from "../pages/user/Home";
import MyEvents from "../pages/user/MyEvents";

export const userPaths = [
  {
    name: "Home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Events",
    path: "events",
    element: (
      <ProtectedRoute role="user">
        <Events />
      </ProtectedRoute>
    ),
  },
  {
    name: "Add Event",
    path: "add-events",
    element: (
      <ProtectedRoute role="user">
        <AddEvent />
      </ProtectedRoute>
    ),
  },
  {
    name: "My Event",
    path: "my-events",
    element: (
      <ProtectedRoute role="user">
        <MyEvents />
      </ProtectedRoute>
    ),
  },
  {
    name: "Sign In",
    path: "login",
    element: <Login />,
  },
  {
    // name: "Sign In",
    path: "register",
    element: <Register />,
  },
];
