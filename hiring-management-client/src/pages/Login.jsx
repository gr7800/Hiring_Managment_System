import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, [auth, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate("/profile");
      }
      setSubmitting(false);
    });
  };

  return (
    <div className="container mx-auto mt-10 p-8 shadow-xl rounded-lg max-w-md bg-white">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6 text-center">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex flex-col">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-full p-4 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-700 ${loading ? "cursor-not-allowed" : ""}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className="text-red-500 text-center text-sm mt-4">{error}</p>}
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
