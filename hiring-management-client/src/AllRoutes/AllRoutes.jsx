import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import HomeWrapper from "../component/HomeWrapper";
import Job from "../pages/Job";
import SingleJob from "../pages/SingleJob";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";
import SpecialRoute from "./SpecialRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/jobs",
        children: [
          {
            index: true,
            element: <Job />
          },
          {
            path: ":jobId",
            element: <PrivateRoute><SingleJob /></PrivateRoute>
          }
        ]
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <SpecialRoute><Admin /></SpecialRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Signup />
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
