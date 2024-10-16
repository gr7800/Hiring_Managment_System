import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeWrapper from "../component/HomeWrapper";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Job from "../pages/Job";
import SingleJob from "../pages/SingleJob";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";
import SpecialRoute from "./SpecialRoute";
import JobApplicationsForUser from "../pages/JobApplicationsForUser";

const routes = [
  {
    path: "/",
    element: <HomeWrapper />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/jobs",
        children: [
          { index: true, element: <Job /> },
          {
            path: ":jobId",
            element: (
              <PrivateRoute>
                <SingleJob />
              </PrivateRoute>
            ),
          },
        ],
      },
      { path: "/profile", element: <Profile /> },
      {
        path: "/hr/dashboard",
        element: (
          <SpecialRoute>
            <Admin />
          </SpecialRoute>
        ),
      },
      { path: "/my-applications", element: <JobApplicationsForUser /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/contact-us", element: <Contact /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

const AllRoutes = () => <RouterProvider router={router} />;

export default AllRoutes;
